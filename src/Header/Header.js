import React, {Component} from 'react';
import {VelocityTransitionGroup} from 'velocity-react';

import logo from '../logo.png';
import FlatButton from 'material-ui/FlatButton';
import Welcome from './Welcome'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRead: false
    }
  }

  render() {
    const BaseStyle = {
      width: '100%'
    }
    const Style = {
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: '10',
      position: 'absolute'
    };

    const expanded = <div className="App-header" key='expanded' style={Style}>
      <img src={logo} className="App-logo" alt="logo"/>
      <h2>NoteSelf Cloudant configurator
      </h2>
      <Welcome/>
      <FlatButton
        label='I understand'
        secondary
        style={{outline: '1px solid white'}}
        onTouchTap={() => this.setState({isRead: true})}/>
    </div>
    const collapsed = <div className="App-header" key='collapsed' style={BaseStyle}>
      <img src={logo} className="App-logo" alt="logo"/>
      <h2>NoteSelf Cloudant configurator
      </h2>
    </div>

    return (
      <VelocityTransitionGroup
        leave={{
        animation: 'fadeOut',
        style: {
          position: 'fixed'
        }
        }}>
        <div className='App-header-content'>
        {this.state.isRead
          ? collapsed
          : expanded}
        </div>
      </VelocityTransitionGroup>
    )
  }
}

export default Header