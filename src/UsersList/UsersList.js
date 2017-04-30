import React, { Component } from 'react';

import AddUser from './AddUser'
import User from './User'

class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addingAnUser: false
        };
    }
    

    render() {
        const users = this.props.users.map( usr => <User key={usr.name} {...usr}/>)
        return (
            <div>
                <button onClick={()=>this.setState({addingAnUser: true})}> Add User </button>
                { this.state.addingAnUser && <AddUser onSubmit={this.props.addUser}/>}
                {users}
            </div>
        );
    }
}

export default UsersList;