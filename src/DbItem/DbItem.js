import React, { Component } from 'react';
import PropTypes from 'prop-types'
import GoDatabase from 'react-icons/lib/go/database';
import MdErrorOutline from 'react-icons/lib/md/error-outline'

import {Card,  CardHeader, CardText} from 'material-ui/Card';


import PouchDB  from 'pouchdb'
import pouchdbAuthentication from 'pouchdb-authentication'
PouchDB.plugin(pouchdbAuthentication);

import UsersList from '../UsersList'
import SlideDown from '../SlideDown'
import GrantUser  from '../GrantUser'
import {PersonAdd,Cancel} from '../simpleComponents/plus'

const GrantUserSlideDown = SlideDown(GrantUser)
const DivSlideDown = SlideDown('div')


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

    static propTypes = {
      couchAuth: PropTypes.bool,
      members: PropTypes.shape({ names: PropTypes.array, roles: PropTypes.array}),  
      admins: PropTypes.shape({ names: PropTypes.array, roles: PropTypes.array}),  
    };

    constructor(props) {
        super(props);
        this.errored = this.errored.bind(this);
        this.enableCouchAuth = this.enableCouchAuth.bind(this);
        this.addUser = this.addUser.bind(this);        
        this.state = { 
            error: false,
            addingAnUser: false,
        };
        this.api = props.api;
        this.db = { 
            api: wrapGeneratedAxios(this.api, `${props.name}/`),
            pouch: new PouchDB(props.url + props.name, {skipSetup: true})
        };
    }

    errored(err){
        console.error(err);
        this.setState({ error: true, err: err.message })
    }

    enableCouchAuth() {
        // This documents disables Cloudant auth and enables the couchdb auth using _users database
        // ref https://console.ng.bluemix.net/docs/services/Cloudant/api/authorization.html#enabling-the-_users-database-with-cloudant
        const basicDoc =
            {
                "couchdb_auth_only": true,
                "members": {
                    "names": [], "roles": []
                },
                "admins": {
                    "names": [this.props.user.name], "roles": []
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

    addUser({name,role}){
        this.setState({addingAnUser: false});
        console.log(arguments)
        return this.db
        .api
        .get('_security')
        .then(({ data }) =>
        {
            data[role].names.push(name)
            return this.db.api.put('_security', data);
        })
        .then(this.checkCouchAuth)
        .catch(this.errored)
    }


    renderUsersList( members, admins ){
        const users = members.names
                        .map( (usr) =>({ name: usr, admin: false })) // Regular users
                        .concat(
                            admins.names.map( usr =>({ name:usr, admin:true })) // Admin users
                        )
        return <UsersList users={users} />
    }

    render() {
        return (
            <Card 
                onExpandChange={()=>this.setState({addingAnUser: !this.state.addingAnUser})}
                className='Card'
                expandable
            >
                <CardHeader 
                    title={this.props.name} 
                    avatar={<GoDatabase />} 
                    subtitle={this.state.error ? <MdErrorOutline /> : null }
                    showExpandableButton={this.props.couchAuth}
                    closeIcon={<PersonAdd/>}
                    openIcon={<Cancel/>}
                    />
                    <CardText>
                    { !this.props.couchAuth 
                        ? <button onClick={this.enableCouchAuth}>Enable</button> 
                        :  <DivSlideDown expanded={!this.state.addingAnUser}>{this.renderUsersList(this.props.members, this.props.admins)} </DivSlideDown>
                    }
                    <GrantUserSlideDown expanded={this.state.addingAnUser} users={this.props.users} onSubmit={this.addUser}/>

                    </CardText>
            </Card>
        );
    }
}