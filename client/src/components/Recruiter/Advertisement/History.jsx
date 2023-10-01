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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((history?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col justify-start items-center pr-[100px] pl-[100px] pt-[50px] font-[Inter] bg-[#F5F5F6] h-[973px] w-[1565px]">
      <div className="w-full flex flex-row justify-center items-center">
        <p className="text-[40px] text-start font-[Montserrat] font-[400] text-[#373737] w-[90%] flex flex-row justify-start items-center pl-2">
          Advertising History
        </p>
      </div>
      <div className="w-full h-fit flex flex-col justify-center items-center pt-6 pb-14">
        <div className="w-[90%] h-fit border-[2px] border-[#F48FB1] rounded-[5px] shadow-pro1">
          <div className="w-full h-[50px] flex flex-row justify-start items-center bg-[#F48FB1] text-[#FFFFFF]">
            <p className="text-[20px] font-[500] font-[Montserrat] w-[60%] text-center hover:cursor-pointer"
            onClick={toggleSortTitle}>
              Job
            </p>
            <p
              className="text-[20px] font-[500] font-[Montserrat] w-[25%] text-center hover:cursor-pointer"
              onClick={toggleSortDate}
            >
              Date
            </p>
            <p
              className="text-[20px] font-[500] font-[Montserrat] w-[15%] text-center hover:cursor-pointer"
              onClick={toggleSortStatus}
            >
              Status
            </p>
          </div>
          <div className="w-full mb-2 flex justify-center items-center ">
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
                {currentItems.map((job, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row justify-start items-center w-full h-[60px]  border-b-[1px] hover:bg-[#fafafa]"
                    >
                      <p className="text-[18px] font-[Inter] w-[60%] pl-14">
                        {job.job_title}
                      </p>
                      <p className="text-[18px]font-[Inter] w-[25%] text-start pl-6">
                        {formatDateTime(job.created_at)}
                      </p>
                      <div className="text-[18px] font-[Inter] w-[15%] flex justify-center">
                        <p
                          className={`w-[80px] text-center rounded-2xl ${
                            job.payment_status === "paid"
                              ? "bg-[#F48FB1] text-[#FFFFFF]"
                              : "bg-gray-300 text-[#8E8E8E]"
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
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
export default History;
function PaginationControls({ totalPages, currentPage, handlePageChange }) {
  return (
    <>
      <div className="flex justify-start">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-10 w-25 ml-0 leading-tight  rounded-l-lg font-[Inter] text-[16px] ${
                  currentPage === 1 ? "cursor-not-allowed bg-ggrey-200 text-ggrey-100" : "bg-[#f190b1] text-white"
                }`}
                onClick={
                  currentPage === 1
                    ? null
                    : () => handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                Previous
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center justify-center px-3 h-10 w-10 leading-tight text-white hover:bg-[#f190b1] font-[Inter] text-[16px] ${
                    currentPage === index + 1
                      ? "bg-[#f38fb1]"
                      : "bg-rose-200 "
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-10 w-25 leading-tight rounded-r-lg   font-[Inter] text-[16px] ${
                  currentPage === totalPages
                    ? "cursor-not-allowed bg-ggrey-200 text-ggrey-100"
                    : "bg-[#f190b1] text-white"
                }`}
                onClick={
                  currentPage === totalPages
                    ? null
                    : () => handlePageChange(currentPage + 1)
                }
                
                disabled={currentPage === totalPages}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}