import { ChakraProvider } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useGlobalContext } from "../utils/context.jsx";
import pointingGirl from "../images/discussing.svg";
import UserReg1 from "../components/register/userReg1.jsx";
import UserReg2 from "../components/register/userReg2.jsx";
import UserReg3 from "../components/register/userReg3.jsx";
import Recruiter2 from "../components/register/recruiter2.jsx";
import Recruiter1 from "../components/register/recruiter1.jsx";

function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <ChakraProvider>
      {/* <UserReg1 /> */}
      {/* <UserReg2 /> */}
      {/* <UserReg3 /> */}
      <Recruiter1 />
      {/* <Recruiter2 /> */}
    </ChakraProvider>
  );
}

export default RegisterPage;
