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
import {PersonAdd,Cancel, ActiveDb } from '../simpleComponents/plus'

const GrantUserSlideDown = SlideDown(GrantUser)
const DivSlideDown = SlideDown('div')

export default class DbItem extends Component {

    static propTypes = {
      couchAuth: PropTypes.bool,
      members: PropTypes.shape({ names: PropTypes.array, roles: PropTypes.array}),  
      admins: PropTypes.shape({ names: PropTypes.array, roles: PropTypes.array}),
      grantUserToDb: PropTypes.func,
      name: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.errored = this.errored.bind(this);
        this.addUser = this.addUser.bind(this);        
        this.state = { 
            error: false,
            addingAnUser: false,
        };
    }

    errored(err){
        console.error(err);
        this.setState({ error: true, err: err.message })
    }

    addUser(user){
        this.setState({addingAnUser: false});
        return this.props.grantUserToDb(this.props.name, user)
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
                expanded={this.state.addingAnUser}
                className='Card'
                expandable
            >
                <CardHeader 
                    title={this.props.name} 
                    avatar={<ActiveDb/>}
                    subtitle={this.state.error ? <MdErrorOutline /> : null }
                    showExpandableButton
                    closeIcon={<PersonAdd/>}
                    openIcon={<Cancel/>}
                    />
                    <CardText>
                        <DivSlideDown expanded={!this.state.addingAnUser}>{this.renderUsersList(this.props.members, this.props.admins)} </DivSlideDown>
                        <GrantUserSlideDown expanded={this.state.addingAnUser} users={this.props.users} onSubmit={this.addUser}/>
                    </CardText>
            </Card>
        );
    }
}