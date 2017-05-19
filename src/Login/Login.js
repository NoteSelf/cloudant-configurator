import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

import LoginForm from '../LoginForm'
import { OkButton } from '../simpleComponents/plus'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {user:{ name: '', password: '' }};
        this.tryLogin = this.tryLogin.bind(this);
        this.whoAmI = this.whoAmI.bind(this);
        this.logout = this.logout.bind(this);
    }

    url(subpath=''){
        return `https://${this.state.user.name}.${this.props.vendorurl || 'cloudant.com'}/${subpath}`
    }

    whoAmI(){
        axios.get(this.url('_session')).then(({data})=>{
             if(data.ok && data.info.authenticated === 'cookie'){
                 this.setState({isUserLogged: true , info: data.userCtx});
                }
            })
    }

    logout(){
        axios.delete(this.url('_session')).then(({data})=>{
             this.setState({isUserLogged: false, info: {}});
            })
    }

    componentDidMount(){
        this.whoAmI();
    }

    tryLogin(user) {
        this.setState({user}, () =>
                      axios.post(this.url('_session'),user)
                      .then(this.whoAmI)
                      .catch(console.info)
                     )
    }

    render() {
        return (
            <div>
            { !this.state.isUserLogged 
            ?
                <LoginForm onSubmit={this.tryLogin}/>
            :
                <div><OkButton onClick={this.logout} label='Logout' fullWidth/>
                    { 
                        React.cloneElement(this.props.children, { logout: this.logout, user: this.state.info, url: this.url(), api: axios.create({baseURL: this.url()}) })
                    }
                </div>
            }
            </div>
        );
    }
};
