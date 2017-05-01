import React, { Component } from 'react';

import GrantUser  from '../GrantUser'
import User from './User'

class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addingAnUser: false
        };
        this.formSubmitted = this.formSubmitted.bind(this);
    }
    
    /**
     * This function just hides the grant form and submits the user
     * @param {Object} user the user that is beign granted permissions
     */
    formSubmitted(user){
        this.setState({addingAnUser: false});
        this.props.addUser(user);
    }
    

    render() {
        const users = this.props.users.map( usr => <User key={usr.name} {...usr}/>)
        const {availableUsers} = this.props;
        return (
            <div>
                <button onClick={()=>this.setState({addingAnUser: true})}> Grant User </button>
                { this.state.addingAnUser && 
                <GrantUser  users={availableUsers} onSubmit={this.formSubmitted}/>
                }
                {users}
            </div>
        );
    }
}

export default UsersList;