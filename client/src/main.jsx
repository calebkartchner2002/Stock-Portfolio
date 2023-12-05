import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import './index.css';
import 'vite/modulepreload-polyfill';
import App from './App.jsx';
import Portfolio from "./Portfolio.jsx"

// API KEY :: 3LsICkcEX4Y2lDe9Zq1bPGC7r9x_VBvv 
// Polygon.io api
// 5 requests per minute
// EOD data
// 2 years of historical data

const router = createHashRouter([
  {
    path: "/",
    element:<App/>,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/portfolio",
        element: <Portfolio/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);