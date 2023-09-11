import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import AuthenticatedApp from './pages/AuthenticatedApp.jsx';
import UnauthenticatedApp from './pages/UnauthenticatedApp.jsx';
import { useAuth } from './contexts/Authorization';


function App() {
  const auth = useAuth();
  return (
    <ChakraProvider>
        {auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </ChakraProvider>
  );
}

export default App;
