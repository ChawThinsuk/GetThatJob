import JobCardAds from "./JobCardAds.jsx";
import { useState } from "react";
import man from "../../../assets/man.svg";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
function Ads() {
  const [budget, setBudget] = useState(0);
  const [selectedJobs, setSelectedJobs] = useState(null);
  const toast = useToast();
  const budgetValue = parseFloat(budget);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedJobs) {
      toast({
        title: "Please select your job",
        description: "Please select your job",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (isNaN(budgetValue) || budgetValue < 10) {
      toast({
        title: "Invalid Budget.",
        description:
          "Please enter a valid budget amount greater than or equal to 10.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      axios
        .post(
          `http://localhost:4000/ads/create-checkout-session/${selectedJobs}/${budget}`
        )
        .then((response) => {
          window.location.replace(response.data.url);
        })
        .catch((error) => {
          // Handle errors
        });
    }
  };

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-srceen pr-[100px] pl-[100px] pt-[50px] font-[Inter] bg-[#F5F5F6]">
      <div className="flex flex-row justify-center items-start w-full">
        <div>
          <p className="text-[46px] text-start w-full font-[Montserrat] font-[400] text-[#373737]">
            Advertising
          </p>
          <p className="text-[24px] pt-2 font-[Inter] font-[400] text-[#373737]">
            Select your job
          </p>
          <div>
            <JobCardAds prop={{ selectedJobs, setSelectedJobs }} />
          </div>
        </div>
        <div className="flex flex-col justify-start items-center h-[800px] mt-[113px]">
          <div className="ml-12 flex flex-col justify-center items-center w-[330px] h-[380px] rounded-[8px] border-[1px] border-[#E1E2E1] bg-[#ffc1e367] shadow-pro1 ">
            <p className="text-center text-[28px] font-[Inter] font-[600] text-gray-700">
              Advertising<br></br> budget
            </p>
            <div className="flex flex-wrap justify-center items-center w-[200px] gap-[10px] mt-4">
              <button
                className={`border-[1px] border-[#F48FB1] rounded-[8px] w-[60px] h-[24px] text-[14px] font-[Inter] font-[400] text-center shadow-pro1 ${budget === 100 ? "bg-[#E1E2E1]" : "bg-[#FFFFFF]"}`}
                onClick={() => setBudget(100)}
                type="button"
              >
                100฿
              </button>
              <button
                className={`border-[1px] border-[#F48FB1] rounded-[8px] w-[60px] h-[24px] text-[14px] font-[Inter] font-[400] text-center shadow-pro1 ${budget === 300 ? "bg-[#E1E2E1]" : "bg-[#FFFFFF]"}`}
                onClick={() => setBudget(300)}
                type="button"
              >
                300฿
              </button>
              <button
                className={`border-[1px] border-[#F48FB1] rounded-[8px] w-[60px] h-[24px] text-[14px] font-[Inter] font-[400] text-center shadow-pro1 ${budget === 500 ? "bg-[#E1E2E1]" : "bg-[#FFFFFF]"}`}
                onClick={() => setBudget(500)}
                type="button"
              >
                500฿
              </button>
              <button
                className={`border-[1px] border-[#F48FB1] rounded-[8px] w-[60px] h-[24px] text-[14px] font-[Inter] font-[400] text-center shadow-pro1 ${budget === 1000 ? "bg-[#E1E2E1]" : "bg-[#FFFFFF]"}`}
                onClick={() => setBudget(1000)}
                type="button"
              >
                1000฿
              </button>
              <button
                className={`border-[1px] border-[#F48FB1] rounded-[8px] w-[60px] h-[24px] text-[14px] font-[Inter] font-[400] text-center shadow-pro1 ${budget === 1500 ? "bg-[#E1E2E1]" : "bg-[#FFFFFF]"}`}
                onClick={() => setBudget(1500)}
                type="button"
              >
                1500฿
              </button>
              <button
                className={`border-[1px] border-[#F48FB1] rounded-[8px] w-[60px] h-[24px] text-[14px] font-[Inter] font-[400] text-center shadow-pro1 ${budget === 3000 ? "bg-[#E1E2E1]" : "bg-[#FFFFFF]"}`}
                onClick={() => setBudget(3000)}
                type="button"
              >
                3000฿
              </button>
            </div>
            <input
              onChange={(e) => setBudget(e.target.value)}
              type="number"
              value={budget}
              min={10}
              placeholder="Enter the amount"
              className="mt-4 w-[200px] h-[40px] outline-none border-[1px] border-[#F48FB1] rounded-[8px] text-[18px] font-[Inter] font-[400] pl-2 shadow-pro1 bg-[#FFFFFF]"
            ></input>
            <p className="text-left w-[200px] text-[10px] text-gray-500 font-[Inter] font-[500] pl-2 mt-1">
              Payment Minimun Budget 10 ฿
            </p>
            <button
              className={`m-4 w-[147px] h-[54px] border-[2px] border-[#F48FB1] tracking-wide  rounded-3xl hover:bg-[#F5F5F6] text-[20px] text-[#616161] font-[Inter] font-[600] shadow-pro1 bg-[#FFFFFF]`}
              type="button"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </div>
          <img src={man} className="w-[250px] h-[250px] mt-[70px] ml-12" />
        </div>
      </div>
    </div>
  );
}
export default Ads;
