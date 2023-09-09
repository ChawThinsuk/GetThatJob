import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ContextProvider } from '../src/contexts/registerContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/Authorization.jsx';
import jwtInterceptor from './utils/jwtIntercepter.jsx';

jwtInterceptor();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
