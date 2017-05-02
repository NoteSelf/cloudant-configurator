import React, { Component } from 'react';
import Map from 'lodash.map'

import './styles.css'
import SlideDown from '../SlideDown'
import CreateUser from './CreateUser'
import User from './User'

const CreateUserSlider = SlideDown(CreateUser)
class UsersDb extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreationForm: false
        };
    }
    
    conditionalStyles(condition){
        return { 
            height: condition ? '' : 0 ,
            opacity: condition ? 1 : 0
        }
    }

    render() {
        return (
            <div className='UsersDb-wrapper'>
            <button onClick={()=>this.setState({showCreationForm: !this.state.showCreationForm})}>Create user</button>
                <CreateUserSlider expanded={this.state.showCreationForm} onSubmit={this.props.createUser} />
                <div className="Users-list">
                    {Map(this.props.users, (user,k)=><User key={k} {...user}/>)}
                </div>
            </div>
        );
    }
}

export default UsersDb;