import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ContextProvider } from '../src/contexts/registerContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/Authorization.jsx';
import { ProProvider } from './contexts/Professional.jsx';
import jwtInterceptor from './utils/jwtIntercepter.jsx';
import { QueryClient, QueryClientProvider} from 'react-query';


const queryClient = new QueryClient();
jwtInterceptor();
ReactDOM.createRoot(document.getElementById('root')).render( 
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ProProvider>
            <ContextProvider>
              <App />
            </ContextProvider>
          </ProProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter> 
);
