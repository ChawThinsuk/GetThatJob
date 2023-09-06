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

function TalentFormProgress2() {
  const { registerPage, setRegisterPage, customTextStyle } = useGlobalContext();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ChakraProvider>
      <div className="flex flex-col w-full items-center font-[Inter] ml-12">
        {/* Register */}
        <div className="flex">
          <div className="mr-4 w-[32px] h-[32px] bg-[#616161] rounded-full text-white text-center font-semibold flex items-center justify-center">
            1
          </div>
          <div className="mr-4 text-[16px]">
            <p className="text-[10px]">IN PROGRESS</p>
            <p>Login</p>
            <p>Information</p>
          </div>
          <div className="mr-4 w-[32px] h-[32px] bg-[#F48FB1] rounded-full text-white text-center font-semibold flex items-center justify-center">
            2
          </div>
          <div className="mr-4 text-[16px] ]">
            <p className="text-[10px]">PENDING</p>
            <p>Personal</p>
            <p>Information</p>
          </div>
          <div className="mr-4 w-[32px] h-[32px] bg-[#E1E2E1] rounded-full text-white text-center font-semibold flex items-center justify-center">
            3
          </div>
          <div className="text-[16px] text-[#8E8E8E]">
            <p className="text-[10px]">PENDING</p>
            <p>Login</p>
            <p>Professional</p>
          </div>
        </div>
        <Box w="100%" maxW="lg" mt={10} borderRadius="md" ml={20}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <span className="text-[#616161] text-[10px] tracking-[1.5px] uppercase">
                You can complete this information later but we recommend you to
                do it now
              </span>
              <FormControl id="name" isRequired>
                <FormLabel sx={customTextStyle}>NAME</FormLabel>
                <Input
                  borderColor="#F48FB1"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel sx={customTextStyle}>Phone</FormLabel>
                <Input
                  borderColor="#F48FB1"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
                <span className="text-[#8E8E8E] text-[12px] lowercase">
                  +[country code][number]
                </span>
              </FormControl>
              <FormControl id="birthDate" isRequired>
                <FormLabel sx={customTextStyle}>BIRTHDATE</FormLabel>
                <Input
                  borderColor="#F48FB1"
                  type="date"
                  placeholder="Enter your birthdate"
                  value={birthDate}
                  onChange={(event) => {
                    setBirthDate(event.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="linkedinUrl" isRequired>
                <FormLabel sx={customTextStyle}>Linkedin URL</FormLabel>
                <Input
                  borderColor="#F48FB1"
                  type="url"
                  placeholder="Enter Linkedin URL"
                  value={linkedinUrl}
                  onChange={(event) => {
                    setLinkedinUrl(event.target.value);
                  }}
                />
              </FormControl>
            </Stack>
            <center>
              <Button
                mt={8}
                mr={5}
                px={5}
                py={5}
                type="submit"
                borderColor="#F48FB1"
                variant="outline"
                size="sm"
                fontSize="md"
                textColor="#616161"
                borderRadius="16px"
              >
                SKIP THIS!
              </Button>
              <Button
                px={5}
                py={5}
                mt={8}
                type="submit"
                bg="#F48FB1"
                variant="solid"
                size="sm"
                fontSize="md"
                color="white"
                borderRadius="16px"
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
    </ChakraProvider>
  );
}

export default TalentFormProgress2;
