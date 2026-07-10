import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './config/AuthProvider';
import smoothscroll from 'smoothscroll-polyfill';
import { HelmetProvider } from 'react-helmet-async'
import { initGA } from './config/analytics';

initGA();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
smoothscroll.polyfill();
