import React, { Component } from 'react';
import EnableUsersDb from './EnableUsersDb'
import DbsList from './DbsList'

export default class DbExplorer extends Component {

    constructor(props) {
        super(props);
        this.state = { error: false };
    }

    componentDidMount(){
        this.checkUsersDb()
    }

    checkUsersDb(){
        return this.props.api
        .get('_users')
        .then(({data})=>
        {
            this.setState({ usersDbExists: true });
        })
        .catch((err) => 
        {
            if( err.error === 'not_found' ){
                return this.setState({ usersDbExists: false });                
            }
            this.setState({ usersDbExists: false, error: true });
            throw err;              
        })
    }

    render(){

        const {url,api,user} = this.props;
        const commonProps = {url,api,user}

        return (
            <div>
                { !this.state.usersDbExists 
                    ? <EnableUsersDb {...commonProps} onSuccess={()=> this.setState({usersDbExists: true})}/> 
                    : <DbsList {...commonProps}/>
                }
            </div>
        );
    }
}