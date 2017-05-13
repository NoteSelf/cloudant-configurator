import React, { Component } from 'react';
import PropTypes from 'prop-types'
import MdErrorOutline from 'react-icons/lib/md/error-outline'

import {Card,  CardHeader, CardText} from 'material-ui/Card';


import PouchDB  from 'pouchdb'
import pouchdbAuthentication from 'pouchdb-authentication'
PouchDB.plugin(pouchdbAuthentication);

import UsersList from '../UsersList'
import SlideDown from '../SlideDown'
import GrantUser  from '../GrantUser'
import {PersonAdd,Cancel, OkButton, ActiveDb, NonActiveDb } from '../simpleComponents/plus'

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
    };

    constructor(props) {
        super(props);
        this.errored = this.errored.bind(this);
        this.enableCouchAuth = this.enableCouchAuth.bind(this);
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

    renderDisabledDb(){
        return 
    }

    render() {
        const message = 'This database does not have Couch authentication enabled. Click on the button below to enable it';
        const subtitle = <div>
                            <span>{message}</span>
                            {  this.state.error ? <MdErrorOutline /> : null }
                         </div>
        return (
            <Card 
                className='Card'
            >
                <CardHeader 
                    title={this.props.name} 
                    avatar={<NonActiveDb/>}
                    subtitle={subtitle}
                    />
                    <CardText>
                        <OkButton label='Enable' fullWidth onClick={this.enableCouchAuth}/>
                    <GrantUserSlideDown expanded={this.state.addingAnUser} users={this.props.users} onSubmit={this.addUser}/>

                    </CardText>
            </Card>
        );
    }
}