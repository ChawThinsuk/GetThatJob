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
  Alert,
  AlertIcon,
  CloseButton,
  useToast,
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

  const toast = useToast();
  const [showEmptyFieldAlert, setShowEmptyFieldAlert] = useState(false);
  const [showCharacterCountAlert, setShowCharacterCountAlert] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!companyWebsite || !aboutCompany) {
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

    // Check character count for "About the company" textarea
    const minCharacters = 100;
    const maxCharacters = 2000;

    if (
      aboutCompany.length < minCharacters ||
      aboutCompany.length > maxCharacters
    ) {
      toast({
        title: "Character Count Error",
        description:
          "About the company should be between 100 and 2000 characters.",
        status: "warning",
        position: "bottom",
        duration: 5000, // Toast duration in milliseconds
        isClosable: true,
      });
      return; // Stop form submission if character count is not within the specified range
    }

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
              className="mr-4 w-[32px] h-[32px] bg-[#F48FB1] hover:bg-[#BF5F82] rounded-full
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
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
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
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
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
                {showCharacterCountAlert && (
                  <Alert status="warning" borderRadius="md" mt={2}>
                    <AlertIcon />
                    About the company should be between 100 and 2000 characters.
                    <CloseButton
                      onClick={() => setShowCharacterCountAlert(false)}
                      position="absolute"
                      right="8px"
                      top="8px"
                    />
                  </Alert>
                )}

                <Button
                  mt={8}
                  mr={5}
                  mb={8}
                  px={5}
                  py={5}
                  type="button"
                  borderColor="#F48FB1"
                  focusBorderColor="#F48FB1"
                  _hover={{ bg: "rgba(244, 143, 177, 0.15)" }}
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
                  type="button"
                  bg="#F48FB1"
                  _hover={{ bg: "#BF5F82" }}
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
