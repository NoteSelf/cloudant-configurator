import React from 'react';
import ReactDOM from 'react-dom';
import Theme from './theme'
import App from './App';
import './index.css';

// Animation dependencies
require('velocity-animate');
require('velocity-animate/velocity.ui');
// Material-ui dependencies
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <Theme><App /></Theme>,
  document.getElementById('root')
);
