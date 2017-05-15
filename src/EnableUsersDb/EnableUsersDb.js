import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import {OkButton, Exclamation, ErrorText} from '../simpleComponents/plus'
import CircularProgress from 'material-ui/CircularProgress';


class EnableUsersDb extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
            error: false,
        }
    }
    

    enableUsersDb(){

        this.setState({creating: true});
        return this.props
        .api
        .put('_users')
        .then(({data})=> {
            this.setState({creating: false})
            this.props.onSuccess(data)
        })
        .catch(({response})=>{
            const {error, reason} = response.data;
            this.setState({
                error: true,
                errorMessage: reason
            })
        })
    }

    renderCreationStatus(){
        return(
            this.state.error 
                ? <ErrorText text={this.state.errorMessage}/>
                : <div><p>Creating the database....</p><CircularProgress size={60} thickness={7} /></div>
        )
    }

    render() {
        return (
            <Card>
            <CardHeader avatar={Exclamation()} title='Attention!' subtitle='_users db is missing'/>
                <CardText>
                    Seems that you don't have the required _users db enabled.
                    This database is required for proper user management under a single Cloudant account.
                    Click the button below if you want to create it.
                </CardText>
                <CardText>
                { this.state.creating 
                    ?  this.renderCreationStatus()
                    : <OkButton onClick={()=>this.enableUsersDb()} label='Create _users'/>
                }
                </CardText>
            </Card>
        );
    }
}

export default EnableUsersDb;