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
} from "@chakra-ui/react";

import { useGlobalContext } from "../../contexts/registerContext.jsx";

function TalentFormProgress() {
  const { registerPage, setRegisterPage, customTextStyle } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <div className="flex flex-col w-full items-center font-[Inter] ml-12">
      {/* Register */}
      <div className="flex items-start ">
        <div className="mr-4 w-[32px] h-[32px] bg-[#F48FB1] rounded-full text-white text-center font-semibold flex items-center justify-center">
          1
        </div>
        <div className="mr-4 text-[16px]">
          <Text className="text-[10px]">IN PROGRESS</Text>
          <Text>Login</Text>
          <Text>Information</Text>
        </div>
        <div className="mr-4 w-[32px] h-[32px] bg-[#E1E2E1] rounded-full text-white text-center font-semibold flex items-center justify-center">
          2
        </div>
        <div className="mr-4 text-[16px] text-[#8E8E8E]">
          <Text className="text-[10px]">PENDING</Text>
          <Text>Personal</Text>
          <Text>Information</Text>
        </div>
        <div className="mr-4 w-[32px] h-[32px] bg-[#E1E2E1] rounded-full text-white text-center font-semibold flex items-center justify-center">
          3
        </div>
        <div className="text-[16px] text-[#8E8E8E]">
          <Text className="text-[10px]">PENDING</Text>
          <Text>Login</Text>
          <Text>Professional</Text>
        </div>
      </div>
      <Box w="100%" maxW="sm" mt={10} borderRadius="md" mr="10">
        <form>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel sx={customTextStyle}>Email Address</FormLabel>
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
              <FormLabel sx={customTextStyle}>Password Confirmation</FormLabel>
              <Input
                borderColor="#F48FB1"
                type="password"
                placeholder="Confirm your password"
                value={passwordConfirmation}
                onChange={(event) => {
                  setPasswordConfirmation(event.target.value);
                }}
              />
            </FormControl>
          </Stack>
          <center>
            <Button
              mt={8}
              type="button"
              bg="#F48FB1"
              variant="solid"
              size="sm"
              fontSize="md"
              color="white"
              onClick={() => {
                setRegisterPage(registerPage + 1);
              }}
            >
              NEXT &gt;
            </Button>
          </center>
        </form>
      </Box>
    </div>
  );
}

export default TalentFormProgress;
