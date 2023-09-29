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
import { usePro } from "../../contexts/Professional";
import Axios from "axios";
import { useAuth } from "../../contexts/Authorization";
import axios from "axios";
import clockImg from "./listItem/clock.svg";
import buildingImg from "./listItem/building.svg";
import calendarImg from "./listItem/calendar.svg";
import moneyImg from "./listItem/money.svg";
import declineImg from "./listItem/decline.svg";
import waitingIcn from "./listItem/waiting.svg";
import inprogressIcn from "./listItem/inProgress.svg";
import finishedIcn from "./listItem/finished.svg";
import declinedIcn from "./listItem/declined.svg";
import sentIcn from "./listItem/sent.svg";
import arrowIcn from "./listItem/arrow.svg";

export const ApplicationList = () => {
  const [value, setValue] = useState("1");
  const { dayAgo } = usePro();
  const { state } = useAuth();
  const toast = useToast();
  const [resultData, setResultData] = useState([]);
  const [fillteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getApplyJob();
  }, []);

  const getApplyJob = () => {
    const apiUrl = `http://localhost:4000/pro/users/applist/${state.userID}`;

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
  };
  const filterData = (status) => {
    if (status === "1") {
      setFilteredData(resultData);
    } else {
      const filtered = resultData.filter((item) => {
        switch (status) {
          case "2":
            return (
              item.job_user_mark === "waiting" &&
              item.job_user_application === true
            );
          case "3":
            return (
              item.job_user_mark === "in_progress " &&
              item.job_user_application === true
            );
          case "4":
            return (
              item.job_user_mark === "finished" &&
              item.job_user_application === true
            );
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

  const handleDeclined = async (jobId) => {
    console.log(state.userID);
    console.log(jobId);
    try {
      await axios.put(
        `http://localhost:4000/pro/users/applist/${state.userID}/jobs/${jobId}`
      );
      getApplyJob();
      toast({
        title: "Application declined",
        status: "success",
        duration: 2000,
        isCloseable: true,
      });
    } catch (error) {
      console.error("Error submit profile");
      toast({
        title:
          "An error occured while declined your application please try again",
        status: "error",
        duration: 2000,
        isCloseable: true,
      });
    }
  };

  return (
    <div className="font-[Inter]">
      <Box
        display="flex"
        flexDirection="column"
        padding="2.1rem 7.6rem"
        gap="1.1rem"
        backgroundColor="#F5F5F6"
      >
        <Text
          fontSize="2.225rem"
          fontStyle="nornal"
          fontWeight="400"
          lineHeight="1.35rem"
          letterSpacing="0.11563rem"
          color="#373737"
          marginBottom="1.1rem"
        >
          Your applications
        </Text>
        <Box gap="1rem">
          <Text
            fontSize="0.725rem"
            fontStyle="nornal"
            fontWeight="400"
            lineHeight="normal"
            letterSpacing="0.19375rem"
          >
            FILTER YOUR APPLICATIONS
          </Text>
          <RadioGroup
            mt={1}
            value={value}
            fontSize="0.975rem"
            fontStyle="nornal"
            fontWeight="400"
            lineHeight="1.35rem"
            letterSpacing="0.11563rem"
            color="#616161"
            gap="0.4rem"
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
        <Box display="flex" flexDirection="column" gap="1.1rem">
          <Text>{`${fillteredData.length} application found`}</Text>
          <Accordion
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="1.1rem"
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
                  thickness="4.1px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="#F48FB1"
                  size="xl"
                />
              </Box>
            ) : (
              fillteredData.map((item) => (
                <label
                  key={item.job_professional_id}
                  className="flex w-full p-[1.1rem] shadow-md flex-col items-start rounded-[0.6rem] border-2px-solid bg-white gap-[1.1rem] hover:bg-[#efeded] cursor-pointer relative "
                  htmlFor={`checkbox-${item.job_professional_id}`}
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${item.job_professional_id}`}
                    className="absolute peer opacity-0"
                  />
                  <div className=" flex w-full justify-between items-center ">
                    <div className=" flex w-[5rem] items-center gap-[1.1rem]">
                      <img
                        src={item.logo}
                        alt={item.logo}
                        className=" flex content-center items-center w-[4.1rem] h-[4rem] p-[0.23331rem] "
                      />
                      <div style={{ whiteSpace: "nowrap" }}>
                        <h1 className="text-[1.35rem] font-normal leading-[1.85rem] tracking-[0.10938rem]">
                          {item.job_title}
                        </h1>
                        <p className="text-[0.975rem] text-[#616161] font-normal leading-[1.225rem] tracking-[0.10625rem] ">
                          {item.company_name}
                        </p>
                      </div>
                    </div>
                    <div className=" flex flex-col items-start gap-[0.6rem] text-[#8E8E8E]">
                      <div className=" flex font-inter text-xs font-normal leading-[0.5rem] tracking-[0.05rem] gap-[0.35rem] items-center">
                        <img src={buildingImg} />
                        {item.job_category} <img src={clockImg} />{" "}
                        {item.job_type}{" "}
                      </div>
                      <div className=" flex font-inter text-xs font-normal leading-[0.5rem] tracking-[0.05rem] gap-[0.35rem] items-center">
                        <img src={moneyImg} />
                        {"  "}
                        {formatSalaryRange(
                          item.salary_min,
                          item.salary_max
                        )}{" "}
                        <img src={calendarImg} /> Posted{" "}
                        {dayAgo(item.job_created_at)}
                        {console.log(item.jobs_professional_updated_at)}
                      </div>
                    </div>
                    <div className="flex items-start gap-[0.35rem] relative ">
                      <div className=" flex flex-col w-[5.1rem] items-center  ">
                        <img src={sentIcn} />
                        <div className="text-center font-inter text-xs text-[#616161] font-normal leading-[1.1rem] tracking-[0.05rem] items-center">
                          Sent {dayAgo(item.jobs_professional_updated_at)}
                        </div>
                      </div>
                      <div className=" flex flex-col w-[5.1rem] items-center font-inter text-xs text-[#F48FB1] text-center font-normal leading-[1.1rem] tracking-[0.125rem]  ">
                        {item.job_user_mark === "waiting" && (
                          <>
                            <img src={waitingIcn} alt="Waiting" />
                            Waiting for review
                          </>
                        )}
                        {item.job_user_mark === "in_progress" && (
                          <>
                            <img src={inprogressIcn} alt="In Progress" />
                            Review in progress
                          </>
                        )}
                        {item.job_user_mark === "finished" && (
                          <>
                            <img src={finishedIcn} alt="Finished" />
                            Review finished
                          </>
                        )}
                        {item.job_user_mark === "declined" && (
                          <>
                            <img src={declinedIcn} alt="Declined" />
                            Declined
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" flex flex-col items-start gap-[1.1rem] max-h-0 overflow-hidden peer-checked:max-h-full   ">
                    <div className=" w-[47.6rem] flex flex-col items-start gap-[0.3rem] ">
                      <h2 className="text-[1.1rem] text-[#c7668a] font-normal leading-normal tracking-[0.10938rem]">
                        Professional experience
                      </h2>
                      {item.job_user_experience != null ? (
                        <p className="text-[0.975rem] text-[#373737] font-normal leading-[1.35rem] tracking-[0.11563rem]">
                          {item.job_user_experience}
                        </p>
                      ) : (
                        <p className="text-[0.975rem] italic text-[#373737] font-normal leading-[1.15rem] tracking-[0.11563rem]">
                          Candidate did not provide information for this
                          section.
                        </p>
                      )}
                    </div>
                    <div className=" w-[47.6rem] flex flex-col items-start gap-[0.6rem] ">
                      <h2 className="text-[1.1rem] text-[#c7668a] font-normal leading-normal tracking-[0.10938rem]">
                        Why are you interested in working at the{" "}
                        {item.company_name}
                      </h2>
                      {item.job_user_interesting != null &&
                      item.job_user_interesting != "" ? (
                        <p className="text-[0.975rem] text-[#373737] font-normal leading-[1.35rem] tracking-[0.11563rem] w-full">
                          {item.job_user_interesting}
                        </p>
                      ) : (
                        <p className="text-[0.975rem] italic text-[#373737] font-normal leading-[1.35rem] tracking-[0.11563rem]">
                          Candidate did not provide information for this
                          section.
                        </p>
                      )}
                    </div>
                    <div className=" flex w-[55.6rem] p-[0rem_1rem] justify-center items-start gap-[1.1rem]">
                      <Button
                        display="flex"
                        alignItems="center"
                        fontSize="0.975rem"
                        fontStyle="normal"
                        fontWeight="500"
                        lineHeight="1.6rem"
                        letterSpacing="0.17813rem"
                        backgroundColor="#BF5F82"
                        textColor="white"
                        gap="0.8rem"
                        borderRadius="2.1rem"
                        _hover={{ bg: "#de7b9c" }}
                        onClick={() => handleDeclined(item.job_id)}
                        isDisabled={item.job_user_mark === "declined"}
                      >
                        <img src={declineImg} /> DECLINE APPLICATION{" "}
                      </Button>
                    </div>
                  </div>
                  <div className=" absolute bottom-0 right-0 transform rotate-0 peer-checked:rotate-180 p-3">
                    {" "}
                    <img src={arrowIcn} alt={arrowIcn} />{" "}
                  </div>
                </label>
              ))
            )}
          </Accordion>

          <Flex></Flex>
        </Box>
      </Box>
    </div>
  );
};
