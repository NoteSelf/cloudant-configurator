import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {userInfo:{ name: 'danielo515', password: '' }};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.whoAmI = this.whoAmI.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleChange(kindOfValue) {
        return (event) => this.setState({ userInfo: { ...this.state.userInfo, [kindOfValue]: event.target.value} });
    }

    url(subpath){
        return `https://${this.state.userInfo.name}.${this.props.vendorurl || 'cloudant.com'}/_${subpath}`
    }

    whoAmI(){
        axios.get(this.url('session')).then(({data})=>{
             this.setState({isUserLogged: data.ok, info: data});
            })
    }

    logout(){
        axios.delete(this.url('session')).then(({data})=>{
             this.setState({isUserLogged: false, info: {}});
            })
    }

    componentDidMount(){
        this.whoAmI();
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post(this.url('session'),this.state.userInfo)
        .then(this.whoAmI)
        .catch(console.info);
    }

    render() {
        return (
            <div>
            { !this.state.isUserLogged 
            ?
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.userInfo.name} onChange={this.handleChange('name')} />
                    <input type="password" value={this.state.userInfo.password} onChange={this.handleChange('password')} />
                    <button type="submit">Login</button>
                </form>
            :
                <div><button onClick={this.logout}>Logout</button>
                    { 
                        React.cloneElement(this.props.children, this.state.info)
                    }
                </div>
            }
            </div>
        );
    }
};