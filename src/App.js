import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import LoginProvider from './Login'
import UsersProvider from './UsersProvider'
import DbExplorer from './DbExplorer'
import USersDb from './UsersDb'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>NoteSelf Cloudant configurator </h2>
        </div>
        <div className='App-body'>
          <LoginProvider>
            <UsersProvider>
              <USersDb/>
              <DbExplorer></DbExplorer>
            </UsersProvider>
          </LoginProvider>
        </div>
      </div>
    );
  }
}

export default App;
