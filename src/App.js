import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginProvider from './login'
import DbExplorer from './DbExplorer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cloudant configurator </h2>
        </div>
          <LoginProvider>
            <DbExplorer></DbExplorer>
          </LoginProvider>
      </div>
    );
  }
}

export default App;
