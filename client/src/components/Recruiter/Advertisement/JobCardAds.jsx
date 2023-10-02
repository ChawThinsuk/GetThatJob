import manufacturing from "../../../assets/pro2/category.svg";
import calendar from "../../../assets/pro2/calendar.svg";
import small from "../../../assets/pro2/money.svg";
import { useAuth } from "../../../contexts/Authorization.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { BsFillGeoFill } from "react-icons/bs";

const JobCardAds = ({ prop }) => {
  const { selectedJobs, setSelectedJobs } = prop;
  const { state } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const getJobs = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `http://localhost:4000/ads/${state.userID}`
      );
      setJobs(result.data.data.rows);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleCardClick = (job) => {
    setSelectedJobs(job.job_id);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobs?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((jobs?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <div className="flex flex-wrap justify-start gap-[16px] w-[950px] mt-[30px] mb-[30px]">
        {currentItems.map((job) => {
          return (
            <div
              key={job.job_id}
              onClick={() => handleCardClick(job)}
              className={`w-[290px] h-[150px] rounded-[8px] bg-[#FFFFFF]  flex justify-center items-center mr-[5px] ml-[5px] shadow-pro1 hover:cursor-pointer mb-[20px] ${
                selectedJobs === job.job_id
                  ? "border-[#F48FB1] border-[2px]"
                  : "border-[#FFFFFF] border-[2px]"
              } `}
            >
              {isLoading ? (
                <Spinner
                  thickness="4px"
                  speed="2s"
                  emptyColor="gray.200"
                  color="#F48FB1"
                  size="xl"
                />
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <div className="flex flex-row justify-center items-center w-[90%] h-[90%] ">
                    <div className="flex flex-col w-full h-full">
                      <div className="flex flex-col w-full h-[56px]">
                        <p className="text-[20px] text-[#373737] w-full h-[32px] font-[Montserrat] font-[500] mt-[10px]">
                          {job.job_title.slice(0, 20)}
                          <span
                            className={`${
                              job.job_title.length < 21 && "hidden"
                            }`}
                          >
                            ...
                          </span>
                        </p>
                        <div className="flex flex-row gap-[5px] w-full h-[24px] mt-[5px]">
                          <img
                            src={manufacturing}
                            className="w-[20px] h-[20px]"
                          />
                          <p className="text-[15px] text-[#8E8E8E] min-w-[142px] h-[22px] font-[Inter] font-[400]">
                            {job.job_category.slice(0, 20)}
                            <span
                              className={`${
                                job.job_category.length < 21 && "hidden"
                              }`}
                            >
                              ...
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-[7px] mt-[5px]">
                          <BsFillGeoFill className="w-[20px] h-[20px] text-[#616161]" />
                          <p className="text-[15px] text-[#8E8E8E] font-[Inter] font-[400] w-full h-[20px]">
                            {job.job_location}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between items-center w-full h-[27px] mt-[5px]">
                          <div className="flex flex-row justify-center items-center gap-[5px] w-[106px] h-[27px] ">
                            <img
                              src={calendar}
                              className="w-[20-px] h-[20px]"
                            />
                            <p className="text-[15px] text-[#8E8E8E] w-[95px] h-[22px] font-[Inter] font-[400]">
                              {job.job_type}
                            </p>
                          </div>
                          <div className="flex flex-row justify-center items-center min-w-[112px] h-[27px] ">
                            <img src={small} className="w-[20px] h-[20px]" />
                            <div className="flex flex-row justify-center items-center min-w-[86px] h-[22px] gap-1">
                              <p className="text-[15px] text-[#8E8E8E] font-[Inter] font-[400]">
                                {(job.salary_min / 1000).toFixed(1)}k
                              </p>
                              <p className="text-[15px] text-[#8E8E8E] font-[Inter] font-[400]">
                                -
                              </p>
                              <p className="text-[15px] text-[#8E8E8E] font-[Inter] font-[400]">
                                {(job.salary_max / 1000).toFixed(1)}k
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-start ml-[10px] mt-[15px]">
        <PaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};
export default JobCardAds;
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
                  currentPage === 1
                    ? "cursor-not-allowed bg-ggrey-200 text-ggrey-100"
                    : "bg-[#f190b1] text-white"
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
                    currentPage === index + 1 ? "bg-[#f38fb1]" : "bg-rose-200 "
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
