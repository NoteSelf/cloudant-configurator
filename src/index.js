import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Animation dependencies
require('velocity-animate');
require('velocity-animate/velocity.ui');
import './injectTapEventPlugin';


const rootEl = document.getElementById('root')

ReactDOM.render(
  <App />,
  rootEl
);


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp />,
      rootEl
    );
  }); 
}