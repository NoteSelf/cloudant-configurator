import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginProvider from './login'
import UsersProvider from './UsersProvider'
import DbExplorer from './DbExplorer'
import USersDb from './UsersDb'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cloudant configurator </h2>
        </div>
          <LoginProvider>
            <UsersProvider>
              <USersDb/>
              <DbExplorer></DbExplorer>
            </UsersProvider>
          </LoginProvider>
      </div>
    );
  }
}

export default App;
