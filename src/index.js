import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TermCalApp from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './App';
import {Amplify} from 'aws-amplify';
//import awsExports from './aws-exports';
import amplifyconfig from './amplifyconfiguration.json';

Amplify.configure(amplifyconfig);
//Amplify.configure(awsExports);

const homepg = ReactDOM.createRoot(document.getElementById('homepg'));
homepg.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
