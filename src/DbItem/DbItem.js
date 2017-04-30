import React, { Component } from 'react';
import GoDatabase from 'react-icons/lib/go/database';
import MdErrorOutline from 'react-icons/lib/md/error-outline'

import PouchDB  from 'pouchdb'
import pouchdbAuthentication from 'pouchdb-authentication'
PouchDB.plugin(pouchdbAuthentication);

import UsersList from '../UsersList'

const wrapGeneratedAxios = (ax, baseUrl) => {

    baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    const wrapper = (method) => (url, ...args) => ax[method](baseUrl + url, ...args);

    return {
        get: wrapper('get'),
        post: wrapper('post'),
        put: wrapper('put')

    }
}

export default class DbItem extends Component {

    constructor(props) {
        super(props);
        this.errored = this.errored.bind(this);
        this.enableCouchAuth = this.enableCouchAuth.bind(this);
        this.addUser = this.addUser.bind(this);        
        this.checkCouchAuth = this.checkCouchAuth.bind(this);
        this.state = { 
            data: {}, error: false, couchAuth: false , addingAnUser: false,
            members: { names:[], roles:[] },
            admins: {names: [], roles: [] }
        };
        this.api = props.api;
        this.db = { 
            api: wrapGeneratedAxios(this.api, `${props.name}/`),
            pouch: new PouchDB(props.url + props.name, {skipSetup: true})
        };
    }

    componentDidMount() {
        this.checkCouchAuth()
            .catch(this.errored)
    }

    errored(err){
        console.error(err);
        this.setState({ error: true, err: err.message })
    }

    checkCouchAuth(){
        return this.db
        .api
        .get('_security')
        .then(({ data }) =>
        {
            const isEnabled = data.couchdb_auth_only;
            // const members = data.members || this.state.members;
            data && this.setState({couchAuth: isEnabled, members: data.members, admins: data.admins})
            return data;
        })
    }

    enableCouchAuth() {
        // This documents disables Cloudant auth and enables the couchdb auth using _users database
        // ref https://console.ng.bluemix.net/docs/services/Cloudant/api/authorization.html#enabling-the-_users-database-with-cloudant
        const basicDoc =
            {
                "couchdb_auth_only": true,
                "members": {
                    "names": ["member"], "roles": []
                },
                "admins": {
                    "names": [this.props.user.name], "roles": ["_admin"]
                }
            };

            return this.db.api
                .put('_security',basicDoc)
                .then(({data})=>{
                    if(data.ok === true){
                        this.setState({
                            couchAuth: true,
                            members: basicDoc.members,
                            admins: basicDoc.admins 
                        })
                    };
                })
                .catch(this.errored)
    }

    // Temporary method, this SHOULD BE REMOVED
    addUser(user){
        this.setState({addingAnUser:false});
        return this.db.pouch
        .signup(user.name,user.password)
        .then(this.checkCouchAuth)
        .catch(this.errored)
    }


    renderUsersList( members, admins ){
        const users = members.names
                        .map( (usr) =>({ name: usr, admin: false })) // Regular users
                        .concat(
                            admins.names.map( usr =>({ name:usr, admin:true })) // Admin users
                        )
        return <UsersList users={users} addUser={this.addUser}/>
    }

    render() {
        return (
            <div>
                <GoDatabase /><span>{this.props.name}</span>{this.state.error ? <MdErrorOutline /> : null }
                { !this.state.couchAuth 
                    ? <button onClick={this.enableCouchAuth}>Enable</button> 
                    :  this.renderUsersList(this.state.members, this.state.admins) 
                }
                
            </div>
        );
    }
}