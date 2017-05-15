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

export default class DbItemDisabled extends Component {

    static propTypes = {
      couchAuth: PropTypes.bool,
      name: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.errored = this.errored.bind(this);
        this.enableCouchAuth = this.enableCouchAuth.bind(this);
        this.state = { 
            error: false,
        };
    }

    errored(err){
        console.error(err);
        this.setState({ error: true, err: err.message })
    }

    enableCouchAuth() {
        this.props
        .enableCouchAuth(this.props.name)
        .catch(this.errored)
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