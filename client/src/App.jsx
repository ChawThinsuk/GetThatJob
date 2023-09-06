import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import AuthenticatedApp from "./pages/AuthenticatedApp.jsx";
import UnauthenticatedApp from "./pages/UnauthenticatedApp.jsx";
import { useAuth } from "./contexts/authentication";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

function App() {
  const auth = useAuth();
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        {auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
