import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  useToast,
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

  const toast = useToast();

  const [showPasswordMismatchAlert, setShowPasswordMismatchAlert] =
    useState(false);
  const [showEmptyFieldAlert, setShowEmptyFieldAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for empty fields
    if (
      !companyName ||
      !recruiterEmail ||
      !recruiterPassword ||
      !recruiterpasswordConfirmation
    ) {
      toast({
        title: "Empty Fields",
        description: "Please fill in all required fields.",
        status: "warning",
        position: "bottom",
        duration: 5000, // Toast duration in milliseconds
        isClosable: true,
      });
      return; // Stop form submission if any field is empty
    }

    if (recruiterPassword !== recruiterpasswordConfirmation) {
      toast({
        title: "Password Mismatch",
        description: "The passwords do not match.",
        status: "error",
        position: "bottom",
        duration: 5000, // Toast duration in milliseconds
        isClosable: true,
      });
    } else {
      setRecruiterRegisterPage(recruiterRegisterPage + 1);
    }
  };

  return (
    <div className="flex w-full">
      {/* Left */}
      <div className="flex flex-col w-[100%] items-end font-[Inter]">
        {/* Register */}
        <div className="flex flex-col w-[80%] ">
          <div className="flex cursor-pointer">
            <div
              className="mr-4 w-[32px] h-[32px] bg-[#F48FB1] hover:bg-[#BF5F82] rounded-full
             text-white text-center font-semibold flex items-center justify-center"
            >
              1
            </div>
            <div className="mr-4 text-[16px]">
              <p className="text-[10px]">IN PROGRESS</p>
              <p>Login</p>
              <p>Information</p>
            </div>
            <div
              onClick={handleSubmit}
              className="mr-4 w-[32px] h-[32px] bg-[#E1E2E1] rounded-full text-white text-center font-semibold flex items-center justify-center"
            >
              2
            </div>
            <div className="mr-4 text-[16px] ]">
              <p className="text-[10px]">IN PROGRESS</p>
              <p>Company</p>
              <p>Information</p>
            </div>
          </div>
          <Box w="100%" maxW="lg" mt={10} borderRadius="md">
            <form>
              <Stack spacing={4}>
                <FormControl id="companyName" isRequired>
                  <FormLabel sx={customTextStyle}>Company Name</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
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
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
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
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
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
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
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
                {showEmptyFieldAlert && (
                  <Alert status="warning" borderRadius="md" mt={2}>
                    <AlertIcon />
                    Please fill in all required fields.
                    <CloseButton
                      onClick={() => setShowEmptyFieldAlert(false)}
                      position="absolute"
                      right="8px"
                      top="8px"
                    />
                  </Alert>
                )}
                {showPasswordMismatchAlert && (
                  <Alert status="error" borderRadius="md" mt={2}>
                    <AlertIcon />
                    The passwords do not match.
                    <CloseButton
                      onClick={() => setShowPasswordMismatchAlert(false)}
                      position="absolute"
                      right="8px"
                      top="8px"
                    />
                  </Alert>
                )}
                <Button
                  px={5}
                  py={5}
                  mt={8}
                  mb={8}
                  type="button"
                  bg="#F48FB1"
                  _hover={{ bg: "#BF5F82" }}
                  variant="solid"
                  size="sm"
                  fontSize="md"
                  color="white"
                  borderRadius="16px"
                  onClick={handleSubmit}
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
