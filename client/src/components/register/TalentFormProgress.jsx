import React, { useState } from "react";
import {
  ChakraProvider,
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
import { useGlobalContext } from "../../contexts/registerContext.jsx";

function TalentFormProgress() {
  const {
    registerPage,
    setRegisterPage,
    customTextStyle,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
  } = useGlobalContext();

  const toast = useToast();

  const [showPasswordMismatchAlert, setShowPasswordMismatchAlert] =
    useState(false);
  const [showEmptyFieldAlert, setShowEmptyFieldAlert] = useState(false);

  const handleSubmit = () => {
    if (password !== passwordConfirmation) {
      toast({
        title: "Password Mismatch",
        description: "The passwords do not match.",
        status: "error",
        position: "bottom",
        duration: 5000, // Toast duration in milliseconds
        isClosable: true,
      });
    } else if (!email || !password || !passwordConfirmation) {
      toast({
        title: "Empty Fields",
        description: "Please fill in all input fields.",
        status: "warning",
        position: "bottom",
        duration: 5000, // Toast duration in milliseconds
        isClosable: true,
      });
    } else {
      setRegisterPage(registerPage + 1);
    }
  };

  return (
    <div className="flex w-full">
      {/* left */}
      <div className="flex flex-col w-[100%] items-end font-[Inter]">
        {/* Register */}
        <div className="flex flex-col w-[80%] ">
          <div className="flex cursor-pointer">
            <div
              className="mr-4 w-[32px] h-[32px] bg-[#F48FB1] rounded-full
           text-white text-center font-semibold flex items-center justify-center "
            >
              1
            </div>
            <div className="mr-4 text-[16px]">
              <Text className="text-[10px]">IN PROGRESS</Text>
              <Text>Login</Text>
              <Text>Information</Text>
            </div>
            <div
              onClick={handleSubmit}
              className="mr-4 w-[32px] h-[32px] bg-[#E1E2E1] rounded-full text-white text-center font-semibold flex items-center justify-center"
            >
              2
            </div>
            <div className="mr-4 text-[16px] text-[#8E8E8E]">
              <Text className="text-[10px]">PENDING</Text>
              <Text>Personal</Text>
              <Text>Information</Text>
            </div>
            <div
              onClick={() => {
                setRegisterPage(registerPage + 2);
              }}
              className="mr-4 w-[32px] h-[32px] bg-[#E1E2E1] rounded-full text-white text-center font-semibold flex items-center justify-center"
            >
              3
            </div>
            <div
              onClick={() => {
                setRegisterPage(registerPage + 2);
              }}
              className="text-[16px] text-[#8E8E8E]"
            >
              <Text className="text-[10px]">PENDING</Text>
              <Text>Login</Text>
              <Text>Professional</Text>
            </div>
          </div>
          <Box w="100%" maxW="lg" mt={10} borderRadius="md">
            <form>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel sx={customTextStyle}>Email Address</FormLabel>
                  <Input
                    _hover={{ borderColor: "#F48FB1" }}
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
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
                    _hover={{ borderColor: "#F48FB1" }}
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl
                  hoverBorderColor="#F48FB1"
                  id="passwordConfirm"
                  isRequired
                >
                  <FormLabel sx={customTextStyle}>
                    Password Confirmation
                  </FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
                    type="password"
                    placeholder="Confirm your password"
                    value={passwordConfirmation}
                    onChange={(event) => {
                      setPasswordConfirmation(event.target.value);
                    }}
                  />
                  {showPasswordMismatchAlert && (
                    <Alert status="error" borderRadius="md" mt={5}>
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
                  {showEmptyFieldAlert && (
                    <Alert status="warning" borderRadius="md" mt={5}>
                      <AlertIcon />
                      Please fill in all input fields.
                      <CloseButton
                        onClick={() => setShowEmptyFieldAlert(false)}
                        position="absolute"
                        right="8px"
                        top="8px"
                      />
                    </Alert>
                  )}
                </FormControl>
              </Stack>
              <center>
                <Button
                  type="button"
                  px={5}
                  py={5}
                  mt={8}
                  bg="#F48FB1"
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
    </div>
  );
}

export default TalentFormProgress;
