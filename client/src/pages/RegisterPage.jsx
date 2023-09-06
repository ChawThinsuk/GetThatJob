import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import { useGlobalContext } from "../contexts/registerContext.jsx";
import Navbar from "../components/navbar.jsx";
import SignupForm from "../components/register/signupform.jsx";

function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ChakraProvider>
      <Navbar />
      <SignupForm />
    </ChakraProvider>
  );
}

export default RegisterPage;
