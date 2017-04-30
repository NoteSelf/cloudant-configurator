import React, { Component } from 'react';

class EnableUsersDb extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
        }
    }
    

    enableUsersDb(){

        this.setState({creating: true});
        return this.props.api
        .put('_users')
        .then(({data})=> {
            this.setState({creating: false})
            this.props.onSuccess(data)
        })
    }

    render() {
        return (
            <div>
                <p>
                    Seems that you don't have the required _users db enabled.
                    This database is required for proper user management under a single Cloudant account.
                    Click the button below if you want to create it.
                </p>
                { this.state.creating 
                    ? <p> Creating the database....</p> 
                    : <button onClick={()=>this.enableUsersDb()}>Create _users</button>
                }
            </div>
        );
    }
}

export default EnableUsersDb;