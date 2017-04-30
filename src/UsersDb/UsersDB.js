import React, { Component } from 'react';

import CreateUser from './CreateUser'

class UsersDb extends Component {
    render() {
        return (
            <div>
                <CreateUser onSubmit={this.props.createUser}/>
                {JSON.stringify(this.props.users)}
            </div>
        );
    }
}

export default UsersDb;