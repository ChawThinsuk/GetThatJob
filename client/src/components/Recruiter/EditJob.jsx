import { ChakraProvider } from "@chakra-ui/react";
import React, { useState , useEffect } from "react";
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
import { useNavigate,useParams } from "react-router-dom";

function EditJob() {
  const { profFormStyle } = useGlobalContext();
  const [job_title, setJob_title] = useState("");
  const [job_position, setJobPosition] = useState("");
  const [job_mandatory, setJobMandatory] = useState("");
  const [job_optional, setJobOptional] = useState("");
  const [job_category, setJobCategory] = useState("");
  const [job_type, setJobType] = useState("");
  const [salary_min, setSalaryMin] = useState("");
  const [salary_max, setSalaryMax] = useState("");
  const { state } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(state.userID);
  // console.log(id)

  const getJobData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/recruiter/${state.userID}/getjob/${id}`
      );
      const data = res.data.data
      // setJobID(data.job_id)
      setJob_title(data.job_title);
      setJobCategory(data.job_category)
      setJobType(data.job_type)
      setSalaryMin(data.salary_min)
      setSalaryMax(data.salary_max)
      setJobPosition(data.job_position)
      setJobMandatory(data.job_mandatory)
      setJobOptional(data.job_optional)
    } catch (err) {
      console.log(err);
    } return 
  };

  const handleSubmit = async () => {
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
      const response = await axios.put(
        `http://localhost:4000/recruiter/editjob/${id}`,
        jobData
      );

      console.log(response.data);

      toast({
        title: "Job Posted",
        description: "We've updated job for you.",
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

  useEffect(() => {
    getJobData();
  }, []);

  // const handleSaveChanges = async () => {
  //   try {
  //     const { data, error: recError } = await supabase.storage
  //       .from("files")
  //       .upload(`companyicon/${Date.now()}${newLogo.name}`, newLogo, {
  //         cacheControl: "3600",
  //         upsert: false,
  //       });

  //     const urlPath = supabase.storage.from("files").getPublicUrl(data.path);

  //     if (recError) {
  //       throw recError; // Throw the error to trigger the catch block
  //     }

  //     const updatedRecData = {
  //       company_email: recruiterEmail,
  //       company_name: companyName,
  //       company_website: companyWebsite,
  //       company_description: aboutCompany,
  //       logo: urlPath.data.publicUrl,
  //     };

  //     await axios.put(
  //       `http://localhost:4000/recruiter/getrecruiter/${state.userID}`,
  //       updatedRecData
  //     );

  //     // Display a success message to the user
  //     toast({
  //       title: "Profile updated successfully",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     // Handle any errors that may occur during the update process
  //     console.error("Error updating profile:", error);
  //     toast({
  //       title: "Error updating profile",
  //       description:
  //         "An error occurred while updating your profile. Please try again later.",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // };

  return (
    <ChakraProvider>
      <div className="flex flex-col pl-[160px] font-[Inter]">
        <h1 className="text-[45px] font-[Montserrat] mb-4 mt-[43px]">
          Edit Job
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
                  <JobCategorySelect setJobCategory={setJobCategory} value={job_category} />
                </FormControl>
                <FormControl id="birthDate" isRequired>
                  <FormLabel sx={profFormStyle}>Type</FormLabel>
                  <JobType setJobType={setJobType} value={job_type} />
                </FormControl>
                <FormControl id="name" isRequired>
                  <FormLabel sx={profFormStyle}>Salary Range</FormLabel>
                  <SalaryRangeInput
                    setSalaryMin={setSalaryMin}
                    setSalaryMax={setSalaryMax}
                    min={salary_min}
                    max={salary_max}
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
              SAVE EDIT
            </Button>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default EditJob;