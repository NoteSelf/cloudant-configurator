import React, { Component } from 'react';
import './App.css';
import LoginProvider from './Login'
import UsersProvider from './UsersProvider'
import DbExplorer from './DbExplorer'
import UsersDb from './UsersDb'
import Header from './Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className='App-body'>
          <LoginProvider>
            <UsersProvider>
              <UsersDb/>
              <DbExplorer></DbExplorer>
            </UsersProvider>
          </LoginProvider>
        </div>
      </div>
    );
  }
}

export default App;
