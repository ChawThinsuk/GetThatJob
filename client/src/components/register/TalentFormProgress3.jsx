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
import { useGlobalContext } from "../../contexts/registerContext.jsx";

function TalentFormProgress3() {
  const { registerPage, setRegisterPage, customTextStyle } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [professionalExperience, setProfessionalExperience] = useState("");
  const [educationalInfo, setEducationalInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col w-full items-center font-[Inter] ml-12">
      {/* Register */}
      <div className="flex">
        <div className="mr-4 w-[32px] h-[32px] bg-[#373737] rounded-full text-white text-center font-semibold flex items-center justify-center">
          1
        </div>
        <div className="mr-4 text-[16px]">
          <p className="text-[10px]">IN PROGRESS</p>
          <p>Login</p>
          <p>Information</p>
        </div>
        <div className="mr-4 w-[32px] h-[32px] bg-[#373737] rounded-full text-white text-center font-semibold flex items-center justify-center">
          2
        </div>
        <div className="mr-4 text-[16px]">
          <p className="text-[10px]">PENDING</p>
          <p>Personal</p>
          <p>Information</p>
        </div>
        <div className="mr-4 w-[32px] h-[32px] bg-[#F48FB1] rounded-full text-white text-center font-semibold flex items-center justify-center">
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
              You can complete this information later, but we recommend you to
              do it now
            </span>
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
          <p className="text-[#616161] text-[10px] tracking-[1.5px] uppercase my-2">
            Upload/Update your CV
          </p>
          <UploadPdf />
          <p className="mt-2 text-[#8E8E8E]">Only PDF. Max size 5MB</p>
          <center>
            <Button
              px={5}
              py={5}
              mr={5}
              mt={8}
              mb={10}
              type="submit"
              bg="#F48FB1"
              variant="solid"
              size="sm"
              fontSize="md"
              color="white"
              borderRadius="16px"
              onClick={() => {
                setRegisterPage(registerPage - 1);
              }}
            >
              &lt; PREVIOUS
            </Button>
            <Button
              mt={8}
              mr={5}
              mb={10}
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
              mb={10}
              type="submit"
              bg="#F48FB1"
              variant="solid"
              size="sm"
              fontSize="md"
              color="white"
              borderRadius="16px"
              onClick={() => {}}
            >
              FINISH &gt;
            </Button>
          </center>
        </form>
      </Box>
    </div>
  );
}

export default TalentFormProgress3;
