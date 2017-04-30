import React, { Component } from 'react';

import AddUser from './AddUser'

class UsersDb extends Component {
    render() {
        return (
            <div>
                <AddUser onSubmit={this.props.createUser}/>
                {JSON.stringify(this.props.users)}
            </div>
        );
    }
}

export default UsersDb;