import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {user:{ name: 'danielo515', password: '' }};
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        axios.post(this.url('_session'),this.state.user)
        .then(this.whoAmI)
        .catch(console.info);
    }

    render() {
        return (
            <div>
            { !this.state.isUserLogged 
            ?
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.user.name} onChange={this.handleChange('name')} />
                    <input type="password" value={this.state.user.password} onChange={this.handleChange('password')} />
                    <button type="submit">Login</button>
                </form>
            :
                <div><button onClick={this.logout}>Logout</button>
                    { 
                        React.cloneElement(this.props.children, { user: this.state.info, url: this.url(), api: axios.create({baseURL: this.url()}) })
                    }
                </div>
            }
            </div>
        );
    }
};