import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import UploadPdf from "./UploadPdf";
import { useGlobalContext } from "../../contexts/registerContext";

function RecruiterFormProgress2() {
  const {
    recruiterRegisterPage,
    setRecruiterRegisterPage,
    customTextStyle,
    companyWebsite,
    setCompanyWebsite,
    aboutCompany,
    setAboutCompany,
    handleSubmit,
  } = useGlobalContext();

  let handleRegister = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="flex w-full">
      {/* Left */}
      <div className="flex flex-col w-[100%] items-end font-[Inter]">
        {/* Register */}
        <div className="flex flex-col w-[80%] ">
          <div className="flex cursor-pointer">
            <div
              onClick={() => {
                setRecruiterRegisterPage(recruiterRegisterPage - 1);
              }}
              className="mr-4 w-[32px] h-[32px] bg-[#616161] rounded-full
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
              onClick={() => {
                setRegisterPage(registerPage - 1);
              }}
              className="mr-4 w-[32px] h-[32px] bg-[#F48FB1] rounded-full
               text-white text-center font-semibold flex items-center justify-center"
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
              <Stack spacing={4} mb={2}>
                <span className="text-[#616161] text-[10px] tracking-[1.5px] uppercase">
                  You can complete this information later but we recommend you
                  to do it now
                </span>
                <FormControl id="companyWebsite" isRequired>
                  <FormLabel sx={customTextStyle}>Company Website</FormLabel>
                  <Input
                    w="70%"
                    borderColor="#F48FB1"
                    type="url"
                    placeholder="Enter your company url"
                    value={companyWebsite}
                    onChange={(event) => {
                      setCompanyWebsite(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="companyInfo" isRequired>
                  <FormLabel sx={customTextStyle}>About the company</FormLabel>
                  <Textarea
                    h="80px"
                    borderColor="#F48FB1"
                    type="text"
                    placeholder="Enter your company info"
                    value={aboutCompany}
                    onChange={(event) => {
                      setAboutCompany(event.target.value);
                    }}
                  />
                  <span className="text-[#8E8E8E] text-[12px]">
                    Between 100 and 2000 characters
                  </span>
                </FormControl>
              </Stack>
              <p className="mb-3 text-[#616161] text-[10px] tracking-[1.5px] uppercase my-2">
                Upload the company logo
              </p>
              <UploadPdf />
              <p className="mt-2 text-[#8E8E8E]">
                Only JPG,JPEG,PNG. Max size 5MB
              </p>
              <center>
                <Button
                  mt={8}
                  mr={5}
                  mb={8}
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
                  mb={8}
                  type="submit"
                  bg="#F48FB1"
                  variant="solid"
                  size="sm"
                  fontSize="md"
                  color="white"
                  borderRadius="16px"
                  onClick={handleRegister}
                >
                  FINISH &gt;
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

export default RecruiterFormProgress2;
