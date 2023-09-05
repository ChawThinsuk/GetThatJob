import React, { useState } from "react";
import {
  ChakraProvider,
  Textarea,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../utils/context.jsx";
import pointingGirl from "../../assets/register-images/woman-pointing.svg";

const customTextStyle = {
  fontFamily: "Inter",
  fontSize: "10px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
};

function UserReg2() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const [userType, setUserType] = useState("PROFESSIONAL");

  return (
    <ChakraProvider>
      <div className="flex w-full">
        {/* Left */}
        <div className="flex flex-col w-[50%] items-end font-[Inter]">
          <div className="flex flex-col w-[80%] font-[Montserrat] mb-[32px]">
            <h2 className="text-[48px] mb-[16px]">Good choice!</h2>
            <h4 className="text-[20px]">Create a new account as...</h4>
          </div>
          {/* Register */}
          <div div className="flex flex-col w-[80%] ">
            <div className="flex mb-[32px]">
              <button
                className={`border-b-2 m-1 ${
                  userType === "PROFESSIONAL"
                    ? "border-[#F48FB1] text-[14px] text-black"
                    : "border-[#BDBDBD] text-[14px] text-[#8E8E8E]"
                } `}
                onClick={() => setUserType("PROFESSIONAL")}
              >
                PROFESSIONAL
              </button>
              <button
                className={`border-b-2 m-1 ${
                  userType === "RECRUITER"
                    ? "border-[#F48FB1] text-[14px] text-black"
                    : "border-[#BDBDBD] text-[14px] text-[#8E8E8E]"
                } `}
                onClick={() => setUserType("RECRUITER")}
              >
                RECRUITER
              </button>
            </div>
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
            <Box
              w="100%"
              maxW="lg"
              // mx="auto"
              mt={10}
              // p={4}
              // borderWidth={1}
              borderRadius="md"
              // boxShadow="md"
              className=""
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <span className="text-[#616161] text-[10px] tracking-[1.5px] uppercase">
                    You can complete this information later but we reccomend you
                    to do it now
                  </span>
                  <FormControl id="name" isRequired>
                    <FormLabel sx={customTextStyle}>NAME</FormLabel>
                    <Input
                      borderColor="#F48FB1"
                      type="name"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormControl id="phone" isRequired>
                    <FormLabel sx={customTextStyle}>Phone</FormLabel>
                    <Input
                      borderColor="#F48FB1"
                      type="tel"
                      placeholder="Enter your phonenumber"
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
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormControl id="passwordConfirm" isRequired>
                    <FormLabel sx={customTextStyle}>Linkedin url</FormLabel>
                    <Input
                      borderColor="#F48FB1"
                      type="url"
                      placeholder="Enter Linkedin Url"
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
                  >
                    NEXT &gt;
                  </Button>
                </center>
              </form>
            </Box>
          </div>
        </div>
        {/* Right */}
        <div className="flex w-[50%] justify-center items-end">
          <img src={pointingGirl} alt="" width="50%" />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default UserReg2;
