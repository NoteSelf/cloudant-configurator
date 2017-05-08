import React, { Component } from 'react';

import './App.css';
import LoginProvider from './Login'
import UsersProvider from './UsersProvider'
import DbExplorer from './DbExplorer'
import UsersDb from './UsersDb'
import Header from './Header'
import Theme from './theme'

class App extends Component {
  render() {
    return (
      <Theme>
        <div className="App">
          <Header/>
          <div className='App-body'>
            <LoginProvider>
              <UsersProvider>
                <UsersDb/>
                <DbExplorer/>
              </UsersProvider>
            </LoginProvider>
          </div>
        </div>
      </Theme>
    );
  }
}

export default App;
