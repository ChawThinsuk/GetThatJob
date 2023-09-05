import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import AuthenticatedApp from './pages/AuthenticatedApp.jsx';
import UnauthenticatedApp from './pages/UnauthenticatedApp.jsx';
import { useAuth } from './contexts/authentication';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const getToken = () => {
  return window.localStorage.getItem('token');
};
queryClient.setDefaultOptions({
  queries: {
    defaultOptions: {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
    onError: (error) => {
      if (
        error.response.status === 401 &&
        error.response.statusText === 'Unauthorized'
      ) {
        window.alert(error.response.data.message);
        window.localStorage.removeItem('token');
        window.location.replace('/login');
      }
      if (error.response.status === 404) {
        window.alert(error.response.data.message);
        window.location.replace('/login');
      }
      return Promise.reject(error);
    },
  },
});

function App() {
  const auth = useAuth();
  return (
  <ChakraProvider>
    {/* <QueryClientProvider client={queryClient}> */}
      {auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    {/* </QueryClientProvider> */}
  </ChakraProvider>
  )
}

export default App;
