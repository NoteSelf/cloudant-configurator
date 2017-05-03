import React from 'react';
import ReactDOM from 'react-dom';
import Theme from './theme'
import App from './App';
import './index.css';

// Animation dependencies
require('velocity-animate');
require('velocity-animate/velocity.ui');

ReactDOM.render(
  <Theme><App /></Theme>,
  document.getElementById('root')
);
