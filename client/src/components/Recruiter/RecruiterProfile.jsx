import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Text,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/registerContext.jsx";
import UploadPdf from "../register/UploadPdf.jsx";

export function RecruiterProfile() {
  const {
    profFormStyle,
    companyName,
    setCompanyName,
    recruiterEmail,
    setRecruiterEmail,
    recruiterPassword,
    setRecruiterPassword,
    recruiterpasswordConfirmation,
    setRecruiterPasswordConfirmation,
    companyWebsite,
    setCompanyWebsite,
    aboutCompany,
    setAboutCompany,
  } = useGlobalContext();

  return (
    <ChakraProvider>
      <div className="flex pl-[160px] font-[Inter]">
        <Box w="100%" maxW="lg" mt={10} borderRadius="md">
          <h1 className="text-[45px] font-[Montserrat] mb-4">Profile</h1>
          <div className="flex mb-[11px]">
            <div className="w-[100px] h-[100px] bg-fuchsia-700 rounded-2xl shadow-lg">
              Logo
            </div>
            <div className="ml-2 flex flex-col">
              <p className="mb-3 text-[#373737] text-[13px] tracking-[1.5px] uppercase">
                company logo
              </p>
              <UploadPdf />
              <p className="mt-2 text-[#8E8E8E]">
                Only JPG,JPEG,PNG. Max size 5MB
              </p>
            </div>
          </div>
          <form>
            <Stack spacing={4}>
              <FormControl id="recruiterEmail" isRequired>
                <FormLabel sx={profFormStyle}>COMPANY EMAIL</FormLabel>
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
              <FormControl id="companyName" isRequired>
                <FormLabel sx={profFormStyle}>COMPANY NAME</FormLabel>
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
              {/* <FormControl id="recruiterPassword" isRequired>
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
              </FormControl> */}
              <FormControl id="companyWebsite" isRequired>
                <FormLabel sx={profFormStyle}>Company Website</FormLabel>
                <Input
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
                <FormLabel sx={profFormStyle}>About the company</FormLabel>
                <Textarea
                  w="1013px"
                  h="229px"
                  borderColor="#F48FB1"
                  type="text"
                  placeholder="Enter your company info"
                  value={aboutCompany}
                  onChange={(event) => {
                    setAboutCompany(event.target.value);
                  }}
                />
              </FormControl>
            </Stack>
            <Button
              letterSpacing="2px"
              w="220px"
              h="53px"
              mt={8}
              mb={8}
              type="submit"
              bg="#F48FB1"
              variant="solid"
              size="sm"
              fontSize="19px"
              color="white"
              borderRadius="19px"
            >
              UPDATE PROFILE
            </Button>
          </form>
        </Box>
      </div>
    </ChakraProvider>
  );
}
/*  */
