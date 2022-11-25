import './index.css';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/State/reduxStore'
import MainApp from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root'));

 root.render(
   <React.StrictMode>
   <MainApp/>
   </React.StrictMode> 

   ); 
 


reportWebVitals();
