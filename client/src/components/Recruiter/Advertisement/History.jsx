import { useAuth } from "../../../contexts/Authorization";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

function History() {
  const { state } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortTitle, setSortTitle] = useState(null);
  const [sortDate, setSortDate] = useState(null);
  const [sortStatus, setSortStatus] = useState(null);

  const getHistory = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`http://localhost:4000/ads/history`, {
        params: { userID: state.userID },
      });
      
      result.data.data?.sort((a, b) => {
        if (sortDate === "asc")
          return new Date(a.created_at) - new Date(b.created_at);
        else
          return new Date(b.created_at) - new Date(a.created_at);
      });

      result.data.data?.sort((a, b) => {
        if (sortTitle === "asc")
          return a.job_title.localeCompare(b.job_title);
        else if (sortTitle === "desc")
          return b.job_title.localeCompare(a.job_title);
        return 0;
      });
  
      result.data.data?.sort((a, b) => {
        if (sortStatus === "paid")
          return a.payment_status.localeCompare(b.payment_status);
        else if (sortStatus === "unpaid")
          return b.payment_status.localeCompare(a.payment_status);
        return 0; 
      });

  
      setHistory(result.data.data);
      console.log(result.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  function formatDateTime(inputDate) {
    let date = new Date(inputDate);
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let day = date.getUTCDate();
    let month = monthNames[date.getUTCMonth()];
    let year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let formattedDateTime =
      day +
      " " +
      month +
      " " +
      year +
      " " +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds;
    return formattedDateTime;
  };

  const toggleSortTitle = () => {
    setSortTitle(sortTitle === "asc" ? "desc" : "asc");
  };

  const toggleSortDate = () => {
    setSortDate(sortDate === "asc" ? "desc" : "asc");
  };

  const toggleSortStatus = () => {
    setSortStatus(sortStatus === "paid" ? "unpaid" : "paid");
  };

  useEffect(() => {
    getHistory();
  }, [sortTitle, sortDate, sortStatus]);

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-srceen pr-[100px] pl-[100px] pt-[50px] font-[Inter] bg-[#F5F5F6]">
      <div className="w-full flex flex-row justify-center items-center">
        <p className="text-[40px] text-start font-[Montserrat] font-[400] text-[#373737] w-[90%] flex flex-row justify-start items-center pl-2">
          Advertising History
        </p>
      </div>
      <div className="w-full h-fit flex flex-col justify-center items-center pt-6 pb-14">
        <div className="w-[90%] h-fit border-[4px] border-[#F48FB1] rounded-[8px] shadow-pro1">
          <div className="w-full h-[50px] flex flex-row justify-start items-center bg-[#F48FB1] text-[#FFFFFF]">
            <p className="text-[24px] font-[600] font-[Inter] w-[60%] text-center hover:cursor-pointer"
            onClick={toggleSortTitle}>
              Job
            </p>
            <p
              className="text-[24px] font-[600] font-[Inter] w-[25%] text-center hover:cursor-pointer"
              onClick={toggleSortDate}
            >
              Date
            </p>
            <p
              className="text-[24px] font-[600] font-[Inter] w-[15%] text-center hover:cursor-pointer"
              onClick={toggleSortStatus}
            >
              Status
            </p>
          </div>
          <div className="w-full mt-2 mb-2 flex justify-center items-center">
            {loading ? (
              <Spinner
                thickness="4px"
                speed="2s"
                emptyColor="gray.200"
                color="#F48FB1"
                size="xl"
              />
            ) : (
              <div className="w-full m-h-[100px] flex flex-col justify-center items-start">
                {history.map((job, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row justify-start items-center w-full h-[60px]  border-b-2"
                    >
                      <p className="text-[18px] font-[600] font-[Inter] w-[60%] pl-14">
                        {job.job_title}
                      </p>
                      <p className="text-[18px] font-[400] font-[Inter] w-[25%] text-start pl-6">
                        {formatDateTime(job.created_at)}
                      </p>
                      <div className="text-[18px] font-[400] font-[Inter] w-[15%] flex justify-center">
                        <p
                          className={`w-[80px] border-[1px] text-[#FFFFFF] text-center rounded-2xl ${
                            job.payment_status === "paid"
                              ? "border-[#f297c9] bg-[#f297c9]"
                              : "border-gray-300 bg-gray-300"
                          }`}
                        >
                          {job.payment_status}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default History;
