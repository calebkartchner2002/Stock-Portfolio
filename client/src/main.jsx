import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import './index.css';
import 'vite/modulepreload-polyfill';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <HomePage/>
    </BrowserRouter>
);