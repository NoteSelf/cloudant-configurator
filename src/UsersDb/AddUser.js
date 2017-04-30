import React, { Component } from 'react';

class AddUserToDB extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            user: {name:'Bruce',password: 'Wayne'}
        };
    }
    
    
    handleChange(kindOfValue) {
        return (event) => this.setState({ user: { ...this.state.user, [kindOfValue]: event.target.value} });
    }

    handleSubmit(e){
        e.preventDefault();
        return this.props.onSubmit(this.state.user);
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.user.name} onChange={this.handleChange('name')} />
                    <input type="password" value={this.state.user.password} onChange={this.handleChange('password')} />
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

export default AddUserToDB;