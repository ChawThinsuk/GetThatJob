import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import { useGlobalContext } from "../utils/context.jsx";
import UserReg1 from "../components/register/userReg1.jsx";
import UserReg2 from "../components/register/userReg2.jsx";
import UserReg3 from "../components/register/userReg3.jsx";
import Recruiter2 from "../components/register/recruiter2.jsx";
import Recruiter1 from "../components/register/recruiter1.jsx";
import Navbar from "../components/navbar.jsx";
import SignupForm from "../components/register/signupform.jsx";

function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // userRegister;

  const [userRegister1, setUserType] = useState();

  return (
    <ChakraProvider>
      <Navbar />
      <SignupForm />
    </ChakraProvider>
  );
}

export default RegisterPage;
