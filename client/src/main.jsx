import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './utils/context.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/authentication.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
