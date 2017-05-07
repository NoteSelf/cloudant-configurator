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
        this.state = {
            showCreationForm: false
        };
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
                        <UsersList users={Map(this.props.users, (user,k)=>({...user, id:k }))} />
                    </div>
                </CardTextSlider>
                <CardTextSlider expanded={this.state.showCreationForm}>
                    <CreateUser onSubmit={this.props.createUser} />
                </CardTextSlider>
            </Card>
        );
    }
}

export default UsersDb;