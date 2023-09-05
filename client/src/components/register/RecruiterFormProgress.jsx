import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

const customTextStyle = {
  fontFamily: "Inter",
  fontSize: "10px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
};

function RecruiterFormProgress() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex w-full mt-10">
      {/* Left */}
      <div className="flex flex-col w-[100%] items-end font-[Inter]">
        {/* Register */}
        <div div className="flex flex-col w-[80%] ">
          <div className="flex">
            <div className="mr-4 w-[32px] h-[32px] bg-[#F48FB1] rounded-full text-white text-center font-semibold flex items-center justify-center">
              1
            </div>
            <div className="mr-4 text-[16px]">
              <p className="text-[10px]">IN PROGRESS</p>
              <p>Login</p>
              <p>Information</p>
            </div>
            <div className="mr-4 w-[32px] h-[32px] bg-[#E1E2E1] rounded-full text-white text-center font-semibold flex items-center justify-center">
              2
            </div>
            <div className="mr-4 text-[16px] ]">
              <p className="text-[10px]">IN PROGRESS</p>
              <p>Company</p>
              <p>Information</p>
            </div>
          </div>
          <Box
            w="100%"
            maxW="lg"
            // mx="auto"
            mt={10}
            // p={4}
            // borderWidth={1}
            borderRadius="md"
            // boxShadow="md"
            className=""
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel sx={customTextStyle}>Company Name</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="name"
                    placeholder="Enter your company name"
                    value={companyName}
                    onChange={(event) => {
                      setCompanyName(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel sx={customTextStyle}>Email</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel sx={customTextStyle}>Password</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="passwordConfirm" isRequired>
                  <FormLabel sx={customTextStyle}>
                    Password Confirmation
                  </FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="password"
                    placeholder="Enter your password"
                    value={passwordConfirmation}
                    onChange={(event) => {
                      setPasswordConfirmation(event.target.value);
                    }}
                  />
                </FormControl>
              </Stack>
              <center>
                <Button
                  px={5}
                  py={5}
                  mt={8}
                  mb={8}
                  type="submit"
                  bg="#F48FB1"
                  variant="solid"
                  size="sm"
                  fontSize="md"
                  color="white"
                  borderRadius="16px"
                >
                  NEXT &gt;
                </Button>
              </center>
            </form>
          </Box>
        </div>
      </div>
      {/* Right */}
    </div>
  );
}

export default RecruiterFormProgress;
