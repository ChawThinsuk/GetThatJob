import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/registerContext.jsx";
import UploadPdf from "../register/UploadPdf.jsx";

export function ProfessionalProfile() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    registerPage,
    setRegisterPage,
    profFormStyle,
    name,
    setName,
    phone,
    setPhone,
    birthDate,
    setBirthDate,
    linkedinUrl,
    setLinkedinUrl,
    title,
    setTitle,
    professionalExperience,
    setProfessionalExperience,
    educationalInfo,
    setEducationalInfo,
    handleSubmit,
  } = useGlobalContext();

  return (
    <ChakraProvider>
      <div className="flex flex-col pl-[160px] font-[Inter]">
        <h1 className="text-[45px] font-[Montserrat] mb-4 mt-[43px]">
          Profile
        </h1>
        <div className="ml-4">
          <h1 className="text-[32px] font-[Montserrat]">
            Personal Information
          </h1>
          <Box w="100%" maxW="lg" mt="12px" borderRadius="md">
            <form>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel sx={profFormStyle}>Email</FormLabel>
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
                {/* <FormControl id="password" isRequired>
                  <FormLabel sx={profFormStyle}>Password</FormLabel>
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
                  <FormLabel sx={profFormStyle}>
                    Password Confirmation
                  </FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="password"
                    placeholder="Confirm your password"
                    value={passwordConfirmation}
                    onChange={(event) => {
                      setPasswordConfirmation(event.target.value);
                    }}
                  />
                </FormControl> */}
                <FormControl id="name" isRequired>
                  <FormLabel sx={profFormStyle}>NAME</FormLabel>
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
                  <FormLabel sx={profFormStyle}>Phone</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="+66" />
                    <Input
                      borderColor="#F48FB1"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      maxLength={9}
                      onChange={(event) => {
                        setPhone(event.target.value);
                      }}
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    />
                  </InputGroup>
                  <FormHelperText className="text-[#8E8E8E] text-[16px] lowercase">
                    +[country code][number]
                  </FormHelperText>
                </FormControl>
                <FormControl id="birthDate" isRequired>
                  <FormLabel sx={profFormStyle}>BIRTHDATE</FormLabel>
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
                  <FormLabel sx={profFormStyle}>Linkedin URL</FormLabel>
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

              <h1 className="ml-2 text-[32px] font-[Montserrat] mt-[53px] mb-[11px]">
                Professional Information
              </h1>
              <h3 className="text-[16px] mb-[11px] text-[#616161]">
                Changes made here will be reflected in your future applications
              </h3>

              <Stack spacing={4}>
                <FormControl id="title" isRequired>
                  <FormLabel sx={profFormStyle}>TITLE</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="text"
                    placeholder="Enter your title"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="experience" w="100%" maxW="lg" isRequired>
                  <FormLabel sx={profFormStyle}>
                    PROFESSIONAL EXPERIENCE
                  </FormLabel>
                  <Textarea
                    w="1013px"
                    h="341px"
                    borderColor="#F48FB1"
                    type="text"
                    placeholder="Enter your company info"
                    value={professionalExperience}
                    onChange={(event) => {
                      setProfessionalExperience(event.target.value);
                    }}
                  />
                  {/* <span className="text-[#8E8E8E] text-[16px] lowercase">
                    Between 300 and 2000 characters
                  </span> */}
                </FormControl>
                <FormControl id="eduInfo" isRequired>
                  <FormLabel sx={profFormStyle}>EDUCATION</FormLabel>
                  <Textarea
                    w="1013px"
                    h="154px"
                    borderColor="#F48FB1"
                    type="text"
                    placeholder="Enter your educational info"
                    value={educationalInfo}
                    onChange={(event) => {
                      setEducationalInfo(event.target.value);
                    }}
                  />
                </FormControl>
              </Stack>
            </form>
          </Box>
          <div className=" flex flex-col mt-[11px]">
            <p className="mb-3 text-[#373737] text-[13px] tracking-[1.5px] uppercase">
              Upload / Update Your CV
            </p>
            <div>
              <UploadPdf />
            </div>

            <p className="mt-2 text-[#8E8E8E] text-[16px]">
              Only PDF. Max size 5MB
            </p>

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
              SAVE CHANGES
            </Button>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}
