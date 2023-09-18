import { JobHeader } from "./JobHeader";
import { Textarea } from "@chakra-ui/react";
import { Text, Box, useToast } from "@chakra-ui/react";
import {
  Radio,
  RadioGroup,
  Stack,
  Button,
  Flex,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { EmailIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { usePro } from "../../contexts/Professional";
import Axios from "axios";
import { useAuth } from "../../contexts/Authorization";
import axios from "axios";

export const YourApplication = () => {
  const [value, setValue] = useState("1");
  const [cvChosen, setCvChosen] = useState(false);
  const [cvFileName, setCvFileName] = useState("No file chosen");
  const { job_id } = useParams();
  const { getSingleJob } = usePro();
  const [experienceData, setExperienceData] = useState("");
  const [cvData, setCvData] = useState("You did not uploaded your CV");
  const { state } = useAuth();
  const [interestingData, setInterestingData] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const submitProfileData = {
        job_user_cv: cvData,
        job_user_experience: experienceData,
        job_user_interesting: interestingData,
      };

      await axios.put(
        `http://localhost:4000/ta/users/${state.userID}/jobs/${job_id}`,
        submitProfileData
      );

      toast({
        title: "Profile submitted successfully",
        status: "success",
        duration: 5000,
        isCloseable: true,
      });
    } catch (error) {
      console.error("Error submit profile");
      toast({
        title: "An error occured while submit your profile, Please try again",
        status: "error",
        duration: 5000,
        isCloseable: true,
      });
    }
  };

  useEffect(() => {
    const apiUrl = `http://localhost:4000/ta/users/${state.userID}`;

    Axios.get(apiUrl)
      .then((res) => {
        const { experience } = res.data.data;
        const { cv } = res.data.data;
        console.log(res.data.data);
        setExperienceData(experience);
        setCvData(cv);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { data, isLoading, error } = useQuery(["job", job_id], () =>
    getSingleJob(job_id)
  );
  console.log(experienceData);
  if (isLoading) {
    return (
      <div className="w-screen h-screen opacity-80 bg-white flex justify-center items-center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#F48FB1"
          size="xl"
        />
      </div>
    );
  }
  if (error) {
    return (
      <div className="absolute w-screen h-screen flex flex-col items-center pt-20">
        <h1 className="text-[3rem] font-bold text-[#373737] ">
          Something wrong
        </h1>
        <div className="flex mt-5 gap-10">
          <Link to="/">
            <h1 className=" text-blue-700 text-[1.2rem] underline hover:cursor-pointer hover:text-blue-800">
              Back to homepage
            </h1>
          </Link>
          <h1
            className=" text-blue-700 text-[1.2rem] underline hover:cursor-pointer hover:text-blue-800"
            onClick={() => window.location.reload(true)}
          >
            Retry
          </h1>
        </div>
      </div>
    );
  }
  if (!data.data.job) {
    return (
      <div className="absolute w-screen h-screen flex flex-col items-center pt-20">
        <h1 className="text-[3rem] font-bold text-[#373737] ">
          JOB NOT FOUNDED
        </h1>
        <div className="flex mt-5 gap-10">
          <Link to="/">
            <h1 className=" text-blue-700 text-[1.2rem] underline hover:cursor-pointer hover:text-blue-800">
              Back to homepage
            </h1>
          </Link>
          <h1
            className=" text-blue-700 text-[1.2rem] underline hover:cursor-pointer hover:text-blue-800"
            onClick={() => window.location.reload(true)}
          >
            Retry
          </h1>
        </div>
      </div>
    );
  }
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setCvFileName(selectedFile.name);

      setCvChosen(true);
    } else {
      setCvFileName("No file chosen");

      setCvChosen(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="3.375rem"
      alignSelf="stretch"
    >
      <JobHeader data={data.data.job} />
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        width="60rem"
        alignItems="flex-start"
      >
        <Text
          fontFamily="Montserrat"
          fontSize="1.5rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
          letterSpacing="0.09375rem"
          color="#BF5F82"
        >
          Complete your application
        </Text>
        <Box
          display="flex"
          flexDirection="column"
          gap="0.25rem"
          alignItems="flex-start"
        >
          <Text
            fontFamily="Inter"
            fontSize="0.625rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="normal"
            letterSpacing="0.09375rem"
            color="#373737"
          >
            SEND YOUR CV UPDATED
          </Text>
          {/* ... */}
          <RadioGroup
            onChange={setValue}
            value={value}
            fontFamily="Inter"
            fontSize="0.875rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="1.25rem"
            letterSpacing="0.01563rem"
            color="#616161"
            colorScheme="customRadio1"
          >
            <Stack direction="row">
              <Radio value="1">Use current CV</Radio>
              <Radio value="2">Upload new CV</Radio>
            </Stack>
          </RadioGroup>
          {/* ... */}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="0.25rem"
          alignItems="flex-start"
        >
          <Flex
            alignItems="center"
            gap="0.5rem"
            fontFamily="Inter"
            fontSize="0.875rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="1.25rem"
            letterSpacing="0.01563rem"
          >
            <Button
              bg="#F48FB1"
              textColor="white"
              _hover={{ bg: "#de7b9c" }}
              onClick={() => document.getElementById("cvInput").click()}
              isDisabled={value === "1"}
            >
              Choose a File
            </Button>
            {value === "1" ? (
              <Text color="#616161">
                {cvData ? cvData : "You did not uploaded your CV"}
              </Text>
            ) : (
              <Text color="#616161">
                {cvChosen ? cvFileName : "No file chosen"}
              </Text>
            )}
          </Flex>
          <input
            type="file"
            style={{ display: "none" }}
            id="cvInput"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <Text
            fontFamily="Inter"
            fontSize="0.75rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="1rem"
            letterSpacing="0.025rem"
            color="#8E8E8E"
          >
            Only PDF. Max size 5MB
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="47.5rem"
          gap="0.25rem"
        >
          <Text
            fontFamily="Inter"
            fontSize="0.625rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="normal"
            letterSpacing="0.09375rem"
            textTransform="uppercase"
            color="#373737"
          >
            Professional experience (taken from your profile)
          </Text>
          <Textarea
            placeholder="Professional experience"
            border="1px"
            borderColor="#F48FB1"
            display="flex"
            alignItems="flex-start"
            padding="0.5rem"
            alignSelf="stretch"
            fontFamily="Inter"
            fontSize="0.625rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="1.25rem"
            letterSpacing="0.01563rem"
            textTransform="uppercase"
            color="#373737"
            value={experienceData}
            onChange={(e) => setExperienceData(e.target.value)}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="47.5rem"
          gap="0.25rem"
        >
          <Text
            fontFamily="Inter"
            fontSize="0.625rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="normal"
            letterSpacing="0.09375rem"
            textTransform="uppercase"
            color="#373737"
          >
            Why are you interested in working at The company name SA
          </Text>
          <Textarea
            placeholder="Mention things about The Company Name SA that excite you. Why would you be a good candidate?"
            border="1px"
            borderColor="#F48FB1"
            display="flex"
            alignItems="flex-start"
            padding="0.5rem"
            alignSelf="stretch"
            fontFamily="Inter"
            fontSize="0.625rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="1.25rem"
            letterSpacing="0.01563rem"
            textTransform="uppercase"
            color="#373737"
            value={interestingData}
            onChange={(e) => setInterestingData(e.target.value)}
          />
          <Text
            fontFamily="Inter"
            fontSize="0.75rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="1rem"
            letterSpacing="0.025rem"
            color="#8E8E8E"
          >
            Between 50 and 1000 characters
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          leftIcon={<EmailIcon />}
          _hover={{ bg: "#de7b9c" }}
          color="white"
          bg="#F48FB1"
          display="flex"
          padding="1rem 1.5rem"
          gap="0.5rem"
          alignItems="center"
          fontFamily="Inter"
          fontSize="0.875rem"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="1.5rem"
          letterSpacing="0.07813rem"
          textTransform="uppercase"
          onClick={handleSubmit}
        >
          {" "}
          SEND APPLICATION
        </Button>
      </Box>
    </Box>
  );
};
