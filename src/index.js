import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode> {/* Wrap your entire app in React.StrictMode */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
