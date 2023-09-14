import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  CSSReset,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/registerContext.jsx";
import SalaryRangeInput from "../Professional/createComponent/SalaryRange.jsx";
import JobCategorySelect from "../Professional/createComponent/JobCategory.jsx";
import JobType from "../Professional/createComponent/JobType.jsx";

export function CreateNewJob() {
  const { profFormStyle } = useGlobalContext();

  return (
    <ChakraProvider>
      <div className="flex flex-col pl-[160px] font-[Inter]">
        <h1 className="text-[45px] font-[Montserrat] mb-4 mt-[43px]">
          Create new job posting
        </h1>
        <div className="ml-4">
          <h1 className="text-[32px] font-[Montserrat]">Main Information</h1>
          <Box w="40%" maxW="lg" mt="12px" borderRadius="md">
            <form>
              <Stack spacing={4}>
                <FormControl id="jobTitle" isRequired>
                  <FormLabel sx={profFormStyle}>Job title</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                    type="email"
                    placeholder="Enter job title"
                    // value={email}
                    // onChange={(event) => {
                    //   setEmail(event.target.value);
                    // }}
                  />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel sx={profFormStyle}>Job Category</FormLabel>
                  {/* <InputGroup>
                    <Input
                      borderColor="#F48FB1"
                      type="text"
                      placeholder="Select or create a category"
                      // value={phone}
                      // onChange={(event) => {
                      //   setPhone(event.target.value);
                      // }}
                    />
                  </InputGroup> */}
                  <CSSReset />
                  <JobCategorySelect />
                </FormControl>
                <FormControl id="birthDate" isRequired>
                  <FormLabel sx={profFormStyle}>Type</FormLabel>
                  <JobType />
                </FormControl>
                <FormControl id="name" isRequired>
                  <FormLabel sx={profFormStyle}>Salary Range</FormLabel>
                  <SalaryRangeInput />
                </FormControl>
              </Stack>

              <h1 className="ml-2 text-[32px] font-[Montserrat] mt-[53px] mb-[11px]">
                Addtional information
              </h1>

              <Stack spacing={4}>
                <FormControl id="experience" w="100%" maxW="lg" isRequired>
                  <FormLabel sx={profFormStyle}>
                    About the job position
                  </FormLabel>
                  <Textarea
                    w="992px"
                    h="89px"
                    borderColor="#F48FB1"
                    type="text"
                    placeholder="Describe the main functions and characteristics of your job position"
                    // value={professionalExperience}
                    // onChange={(event) => {
                    //   setProfessionalExperience(event.target.value);
                    // }}
                  />
                </FormControl>
                <FormControl id="experience" w="100%" maxW="lg" isRequired>
                  <FormLabel sx={profFormStyle}>
                    Mandatory Requirements
                  </FormLabel>
                  <Textarea
                    w="992px"
                    h="89px"
                    borderColor="#F48FB1"
                    type="text"
                    placeholder="List each mandatory requirement in a new line"
                    // value={professionalExperience}
                    // onChange={(event) => {
                    //   setProfessionalExperience(event.target.value);
                    // }}
                  />
                </FormControl>
                <FormControl id="experience" w="100%" maxW="lg" isRequired>
                  <FormLabel sx={profFormStyle}>
                    Optional Requirements
                  </FormLabel>
                  <Textarea
                    w="992px"
                    h="89px"
                    borderColor="#F48FB1"
                    type="text"
                    placeholder="List each optional requirement in a new line"
                    // value={professionalExperience}
                    // onChange={(event) => {
                    //   setProfessionalExperience(event.target.value);
                    // }}
                  />
                </FormControl>
              </Stack>
            </form>
          </Box>
          <div className=" flex flex-col mt-[11px]">
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
              POST THIS JOB
            </Button>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}
