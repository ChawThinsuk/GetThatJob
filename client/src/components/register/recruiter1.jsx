import { ChakraProvider } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../utils/context.jsx";
import pointingGirl from "../../images/discussing.svg";

function Recruiter1() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

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
              <button className="text-[14px] mr-2 mb-4 relative font-medium">
                PROFESSIONAL
                <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#F48FB1]"></span>
              </button>

              <button className="text-[14px] mr-2 mb-4 relative text-[#8E8E8E] font-medium">
                RECRUITER
                <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#BDBDBD]"></span>
              </button>
            </div>
            <div className="flex">
              <div className="mr-4 w-[32px] h-[32px] bg-[#F48FB1] rounded-full text-white text-center font-semibold flex items-center justify-center">
                1
              </div>
              <div className="mr-4 text-[16px]">
                <p className="text-[10px]">IN PROGRESS</p>
                <p>Login</p>
                <p>Information</p>
              </div>
              <div className="mr-4 w-[32px] h-[32px] bg-[#E1E2E1] rounded-full text-white text-center font-semibold flex items-center justify-center">
                2
              </div>
              <div className="mr-4 text-[16px] ]">
                <p className="text-[10px]">IN PROGRESS</p>
                <p>Company</p>
                <p>Information</p>
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
                  <FormControl id="email" isRequired>
                    <FormLabel>Company Name</FormLabel>
                    <Input
                      borderColor="#F48FB1"
                      type="email"
                      placeholder="Enter your company name"
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      borderColor="#F48FB1"
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      borderColor="#F48FB1"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormControl id="passwordConfirm" isRequired>
                    <FormLabel>Password Confirmation</FormLabel>
                    <Input
                      borderColor="#F48FB1"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </FormControl>
                </Stack>
                <center>
                  <Button
                    mt={8}
                    type="submit"
                    bg="#F48FB1"
                    variant="solid"
                    size="sm"
                    fontSize="md"
                    color="white"
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

export default Recruiter1;
