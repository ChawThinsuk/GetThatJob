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

function EditUser() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    registerPage,
    setRegisterPage,
    customTextStyle,
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
      <div className="flex pl-[160px]">
        <Box w="100%" maxW="lg" mt={10} borderRadius="md">
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
                <FormLabel sx={customTextStyle}>
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
              </FormControl>
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
                <FormHelperText className="text-[#8E8E8E] text-[12px] lowercase">
                  +[country code][number]
                </FormHelperText>
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
              <FormControl id="title" maxW="60%" isRequired>
                <FormLabel sx={customTextStyle}>TITLE</FormLabel>
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
                <FormLabel sx={customTextStyle}>
                  PROFESSIONAL EXPERIENCE
                </FormLabel>
                <Textarea
                  h="80px"
                  borderColor="#F48FB1"
                  type="text"
                  placeholder="Enter your company info"
                  value={professionalExperience}
                  onChange={(event) => {
                    setProfessionalExperience(event.target.value);
                  }}
                />
                <span className="text-[#8E8E8E] text-[12px] lowercase">
                  Between 300 and 2000 characters
                </span>
              </FormControl>
              <FormControl id="eduInfo" isRequired>
                <FormLabel sx={customTextStyle}>EDUCATION</FormLabel>
                <Textarea
                  h="80px"
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
      </div>
    </ChakraProvider>
  );
}

export default EditUser;
