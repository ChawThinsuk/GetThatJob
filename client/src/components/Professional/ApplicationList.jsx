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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { EmailIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { usePro } from "../../contexts/Professional";
import Axios from "axios";
import { useAuth } from "../../contexts/Authorization";
import axios from "axios";
import clockImg from "./listItem/clock.svg";
import buildingImg from "./listItem/building.svg";
import calendarImg from "./listItem/calendar.svg";
import moneyImg from "./listItem/money.svg";
import declineImg from "./listItem/decline.svg";

export const ApplicationList = () => {
  const [value, setValue] = useState("1");
  const { job_id } = useParams();
  const { getSingleJob } = usePro();
  const { state } = useAuth();
  const toast = useToast();
  const [resultData, setResultData] = useState([]);
  const [fillteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `http://localhost:4000/ta2/users/${state.userID}`;

    Axios.get(apiUrl)
      .then((res) => {
        const resData = res.data.data;

        setResultData(resData);
        setFilteredData(resData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  const filterData = (status) => {
    if (status === "1") {
      setFilteredData(resultData);
    } else {
      const filtered = resultData.filter((item) => {
        switch (status) {
          case "2":
            return item.job_user_mark === "waiting";
          case "3":
            return item.job_user_mark === "in_progress";
          case "4":
            return item.job_user_mark === "finished";
          case "5":
            return item.job_user_mark === "declined";
          default:
            return false;
        }
      });
      setFilteredData(filtered);
    }
  };

  const formatSalaryRange = (minSalary, maxSalary) => {
    if (!isNaN(minSalary) && !isNaN(maxSalary)) {
      const formatNumber = (number) =>
        Math.abs(number) >= 1000 ? (number / 1000).toFixed(1) + "k" : number;

      const formattedMinSalary = formatNumber(minSalary);
      const formattedMaxSalary = formatNumber(maxSalary);

      return `${formattedMinSalary} - ${formattedMaxSalary}`;
    }
    return "";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - date;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    if (timeDifference < oneDayInMilliseconds * 5) {
      const daysAgo = Math.floor(timeDifference / oneDayInMilliseconds);
      return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="2rem 7.5rem"
      gap="1rem"
      backgroundColor="#F5F5F6"
    >
      <Text
        fontSize="2.125rem"
        fontStyle="nornal"
        fontWeight="400"
        lineHeight="1.25rem"
        letterSpacing="0.01563rem"
        color="#373737"
        marginBottom="1rem"
      >
        Your applications
      </Text>
      <Box>
        <Text
          fontSize="0.625rem"
          fontStyle="nornal"
          fontWeight="400"
          lineHeight="normal"
          letterSpacing="0.09375rem"
        >
          FILTER YOUR APPLICATIONS
        </Text>
        <RadioGroup
          value={value}
          fontSize="0.875rem"
          fontStyle="nornal"
          fontWeight="400"
          lineHeight="1.25rem"
          letterSpacing="0.01563rem"
          color="#616161"
          gap="0.25rem"
          onChange={(newValue) => {
            setValue(newValue);
            filterData(newValue);
          }}
        >
          <Stack direction="row">
            <Radio value="1">All</Radio>
            <Radio value="2">Waiting</Radio>
            <Radio value="3">In progress</Radio>
            <Radio value="4">Finished</Radio>
            <Radio value="5">Declined</Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <Box display="flex" flexDirection="column" gap="1rem">
        <Text>{`${fillteredData.length} application found`}</Text>
        <Accordion
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="1rem"
          allowToggle
        >
          {" "}
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          ) : (
            fillteredData.map((item) => (
              <div
                key={item.job_professional_id}
                className="flex w-[59rem] p-[1rem] shadow-md flex-col items-start rounded-[0.5rem] border-1px-solid bg-white gap-[1rem]"
              >
                <div className=" flex w-[55.5625rem] justify-between items-center ">
                  <div className=" flex items-center gap-[1rem]">
                    <img
                      src={item.logo}
                      alt={item.logo}
                      className=" flex content-center items-center w-[4rem] h-[4rem] p-[0.13331rem] "
                    />
                    <div>
                      <h1 className="text-[1.25rem] font-normal leading-[1.75rem] tracking-[0.00938rem]">
                        {item.job_title}
                      </h1>
                      <p className="text-[0.875rem] text-[#616161] font-normal leading-[1.125rem] tracking-[0.00625rem] ">
                        {item.company_name}
                      </p>
                    </div>
                  </div>
                  <div className=" flex flex-col items-start gap-[0.5rem] text-[#8E8E8E]">
                    <div className=" flex font-inter text-xs font-normal leading-[1rem] tracking-[0.025rem] gap-[0.25rem]">
                      <img src={buildingImg} />
                      {item.job_category} <img src={clockImg} /> {item.job_type}{" "}
                    </div>
                    <div className=" flex font-inter text-xs font-normal leading-[1rem] tracking-[0.025rem] gap-[0.25rem]">
                      <img src={moneyImg} />
                      {"  "}
                      {formatSalaryRange(item.salary_min, item.salary_max)}{" "}
                      <img src={calendarImg} /> Posted{" "}
                      {formatDate(item.created_at)}
                    </div>
                  </div>
                  <div className="flex items-start w-[5rem] gap-[0.25rem]">
                    <div>
                      <EmailIcon color="#616161" />
                    </div>
                    <div>
                      <EmailIcon color="#F48FB1" />
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col items-start gap-[1rem] ">
                  <div className=" w-[47.5] flex flex-col items-start gap-[0.2rem] ">
                    <h2 className="text-[1rem] text-[#c7668a] font-normal leading-normal tracking-[0.00938rem]">
                      Professional experience
                    </h2>
                    {item.job_user_experience != null ? (
                      <p className="text-[0.875rem] text-[#373737] font-normal leading-[1.25rem] tracking-[0.01563rem]">
                        {item.job_user_experience}
                      </p>
                    ) : (
                      <p className="text-[0.875rem] italic text-[#373737] font-normal leading-[1.25rem] tracking-[0.01563rem]">
                        Candidate did not provide information for this section.
                      </p>
                    )}
                  </div>
                  <div className=" w-[47.5] flex flex-col items-start gap-[0.5rem] ">
                    <h2 className="text-[1rem] text-[#c7668a] font-normal leading-normal tracking-[0.00938rem]">
                      Why are you interested in working at the{" "}
                      {item.company_name}
                    </h2>
                    {item.job_user_interesting != null &&
                    item.job_user_interesting != "" ? (
                      <p className="text-[0.875rem] text-[#373737] font-normal leading-[1.25rem] tracking-[0.01563rem]">
                        {item.job_user_interesting}
                      </p>
                    ) : (
                      <p className="text-[0.875rem] italic text-[#373737] font-normal leading-[1.25rem] tracking-[0.01563rem]">
                        Candidate did not provide information for this section.
                      </p>
                    )}
                  </div>
                  <div className=" flex w-[55.5rem] p-[0rem_1rem] justify-center items-start gap-[]1rem">
                    <Button
                      display="flex"
                      alignItems="center"
                      fontSize="0.875rem"
                      fontStyle="normal"
                      fontWeight="500"
                      lineHeight="1.5rem"
                      letterSpacing="0.07813rem"
                      backgroundColor="#BF5F82"
                      textColor="white"
                      gap="0.7rem"
                      borderRadius="2rem"
                      _hover={{ bg: "#de7b9c" }}
                    >
                      <img src={declineImg} /> DECLINE APPLICATION{" "}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </Accordion>

        <Flex></Flex>
      </Box>
    </Box>
  );
};
