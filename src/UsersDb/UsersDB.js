import React, { Component } from 'react';
import Map from 'lodash.map'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {PersonAdd, Cancel} from '../simpleComponents/plus';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';


import './styles.css'
import SlideDown from '../SlideDown'
import CreateUser from './CreateUser'
import UsersList from '../UsersList'

const CardTextSlider = SlideDown(CardText)
class UsersDb extends Component {

    constructor(props) {
        super(props);
        this.createUser = this.createUser.bind(this);
        this.state = {
            showCreationForm: false
        };
    }

    /**
     * This method is only for hidding the creation form. It defers the user creation to its parent, the UsersProvider
     * 
     * @param {Object} user 
     * 
     * @memberof UsersDb
     */
    createUser(user){
        this.props.createUser(user);
        this.setState({showCreationForm: false})
    }

    render() {
        return (
            <Card expandable
                  onExpandChange={(expanded)=> this.setState({showCreationForm:expanded})}
                  className='UsersDb-wrapper Card'
                  >
                <CardTitle 
                    actAsExpander showExpandableButton 
                    title="Users" 
                    closeIcon={<PersonAdd/>}
                    openIcon={<Cancel/>}

                />
                <CardTextSlider expanded={!this.state.showCreationForm}>
                    <div className="Users-list">
                        <UsersList header='Global list of users' tooltip='Grant access to individual databases below' users={Map(this.props.users, (user,k)=>({...user, id:k }))} />
                    </div>
                </CardTextSlider>
                <CardTextSlider expanded={this.state.showCreationForm}>
                    <CreateUser onSubmit={this.createUser} />
                </CardTextSlider>
            </Card>
        );
    }
}

export default UsersDb;