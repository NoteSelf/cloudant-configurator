import React, { Component } from 'react';
import Map from 'lodash.map'

import './styles.css'
import CreateUser from './CreateUser'
import User from './User'

class UsersDb extends Component {
    render() {
        return (
            <div>
                <CreateUser onSubmit={this.props.createUser}/>
                <div className="Users-list">
                    {Map(this.props.users, (user,k)=><User key={k} {...user}/>)}
                </div>
            </div>
        );
    }
}

export default UsersDb;