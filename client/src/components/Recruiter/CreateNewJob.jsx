import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  CSSReset,
  useToast,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/registerContext.jsx";
import SalaryRangeInput from "../Recruiter/createComponent/SalaryRange.jsx";
import JobCategorySelect from "../Recruiter/createComponent/JobCategory.jsx";
import JobType from "../Recruiter/createComponent/JobType.jsx";
import { useAuth } from "../../contexts/Authorization.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CreateNewJob() {
  const { profFormStyle } = useGlobalContext();
  const [job_title, setJob_title] = useState("");
  const [job_position, setJobPosition] = useState("");
  const [job_mandatory, setJobMandatory] = useState("");
  const [job_optional, setJobOptional] = useState("");
  const [job_category, setJobCategory] = useState("");
  const [job_type, setJobType] = useState("");
  const [salary_min, setSalaryMin] = useState();
  const [salary_max, setSalaryMax] = useState();
  const { state } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  // console.log(state.userID);

  const handleSubmit = async () => {
    let userID = state.userID;
    const jobData = {
      job_title,
      job_position,
      job_mandatory,
      job_optional,
      job_category,
      job_type,
      salary_min,
      salary_max,
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/recruiter/${userID}/createjob`,
        jobData
      );

      console.log(response.data);

      toast({
        title: "Job Posted",
        description: "We've created new job for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 3500);
    } catch (error) {
      console.log("Registration error", error);
    }
  };

  const handleMandatoryChange = (event) => {
    const value = event.target.value;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setJobMandatory(value + ",\n");
    } else {
      setJobMandatory(value);
    }
  };

  const handleOptionalChange = (event) => {
    const value = event.target.value;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setJobOptional(value + ",\n");
    } else {
      setJobOptional(value);
    }
  };

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
                    type="text"
                    placeholder="Enter job title"
                    value={job_title}
                    onChange={(event) => {
                      setJob_title(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel sx={profFormStyle}>Job Category</FormLabel>
                  <JobCategorySelect setJobCategory={setJobCategory} />
                </FormControl>
                <FormControl id="birthDate" isRequired>
                  <FormLabel sx={profFormStyle}>Type</FormLabel>
                  <JobType setJobType={setJobType} />
                </FormControl>
                <FormControl  id="name" isRequired>
                  <FormLabel  sx={profFormStyle}>Salary Range</FormLabel>
                  <SalaryRangeInput
                    setSalaryMin={setSalaryMin}
                    setSalaryMax={setSalaryMax}
                  />
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
                    focusBorderColor="#F48FB1"
                    type="text"
                    placeholder="Describe the main functions and characteristics of your job position"
                    value={job_position}
                    onChange={(e) => {
                      setJobPosition(e.target.value);
                    }}
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
                    focusBorderColor="#F48FB1"
                    type="text"
                    placeholder="List each mandatory requirement in a new line"
                    value={job_mandatory}
                    onChange={handleMandatoryChange}
                    onKeyDown={handleMandatoryChange}
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
                    focusBorderColor="#F48FB1"
                    type="text"
                    placeholder="List each optional requirement in a new line"
                    value={job_optional}
                    onChange={handleOptionalChange}
                    onKeyDown={handleOptionalChange}
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
              type="button"
              bg="#F48FB1"
              variant="solid"
              size="sm"
              fontSize="19px"
              color="white"
              borderRadius="19px"
              onClick={handleSubmit}
            >
              POST THIS JOB
            </Button>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}
