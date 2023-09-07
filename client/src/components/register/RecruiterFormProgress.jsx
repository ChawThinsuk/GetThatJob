import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/registerContext";

function RecruiterFormProgress() {
  const {
    recruiterRegisterPage,
    setRecruiterRegisterPage,
    customTextStyle,
    companyName,
    setCompanyName,
    recruiterEmail,
    setRecruiterEmail,
    recruiterPassword,
    setRecruiterPassword,
    recruiterpasswordConfirmation,
    setRecruiterPasswordConfirmation,
  } = useGlobalContext();

  const handleSubmit = () => {
    setRecruiterRegisterPage(recruiterRegisterPage + 1);
  };

  return (
    <div className="flex w-full">
      {/* Left */}
      <div className="flex flex-col w-[100%] items-end font-[Inter]">
        {/* Register */}
        <div className="flex flex-col w-[80%] ">
          <div className="flex">
            <div
              className="mr-4 w-[32px] h-[32px] bg-[#F48FB1] rounded-full
             text-white text-center font-semibold flex items-center justify-center"
            >
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
          <Box w="100%" maxW="lg" mt={10} borderRadius="md">
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="companyName" isRequired>
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
                <FormControl id="recruiterEmail" isRequired>
                  <FormLabel sx={customTextStyle}>Email</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="email"
                    placeholder="Enter your email address"
                    value={recruiterEmail}
                    onChange={(event) => {
                      setRecruiterEmail(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="recruiterPassword" isRequired>
                  <FormLabel sx={customTextStyle}>Password</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="password"
                    placeholder="Enter your password"
                    value={recruiterPassword}
                    onChange={(event) => {
                      setRecruiterPassword(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="recruiterPasswordConfirm" isRequired>
                  <FormLabel sx={customTextStyle}>
                    Password Confirmation
                  </FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="password"
                    placeholder="Enter your password"
                    value={recruiterpasswordConfirmation}
                    onChange={(event) => {
                      setRecruiterPasswordConfirmation(event.target.value);
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
