import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Animation dependencies
require('velocity-animate');
require('velocity-animate/velocity.ui');

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
