import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/navbar.jsx';
import SignupForm from '../components/register/signupform.jsx';

function RegisterPage() {
  return (
    <ChakraProvider>
      <Navbar />
      <SignupForm />
    </ChakraProvider>
  );
}

export default RegisterPage;
