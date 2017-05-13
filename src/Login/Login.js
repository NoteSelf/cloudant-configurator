import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

import LoginForm from '../LoginForm'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {user:{ name: 'danielo515', password: '' }};
        this.tryLogin = this.tryLogin.bind(this);
        this.whoAmI = this.whoAmI.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleChange(kindOfValue) {
        return (event) => this.setState({ user: { ...this.state.user, [kindOfValue]: event.target.value} });
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
        axios.post(this.url('_session'),user)
        .then(this.whoAmI)
        .catch(console.info);
    }

    render() {
        return (
            <div>
            { !this.state.isUserLogged 
            ?
                <LoginForm onSubmit={this.tryLogin}/>
            :
                <div><button onClick={this.logout}>Logout</button>
                    { 
                        React.cloneElement(this.props.children, { logout: this.logout, user: this.state.info, url: this.url(), api: axios.create({baseURL: this.url()}) })
                    }
                </div>
            }
            </div>
        );
    }
};