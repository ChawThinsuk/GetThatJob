import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Authorization';
import JobCard from './JobCard';
import axios from 'axios';
import { Spinner } from "@chakra-ui/react";

export const Following = () => {
  const [followedJobs, setFollowedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const { state } = useAuth();

  const getFollowedJobs = async (userID) => {
    setIsLoading(true);
    try {
      const followedJobFetched = await axios.get(
        'https://gtj-server.onrender.com/pro/followedJobs',
        {
          params: { userID: userID },
        }
      );
      const followedJobData = followedJobFetched.data.data;
      setFollowedJobs(followedJobData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getFollowedJobs(state.userID);
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = followedJobs?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((followedJobs?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <div className='flex flex-col justify-start gap-[21.3334px] w-full min-h-srceen pr-[100px] pl-[100px] pt-[50px] font-[Inter] bg-[#F5F5F6]'>
      <h1 className='font-[Montserrat] font-[400] text-[45.3356px] '>
        Following
      </h1>

      <div className='flex flex-col gap-[10.6667px] p-[10.6672] w-full min-h-screen'>
      {isLoading ? (
        <div className='flex flex-row justify-center items-center h-[50%]'>
        <Spinner
          thickness="4px"
          speed="2s"
          emptyColor="gray.200"
          color="#F48FB1"
          size="xl"
        />
        </div>
      ) : (
          <p className='font-[Montserrat] font-[500] text-[26.668px]'>
            You are following {followedJobs.length} jobs
          </p>
        )}

        <div className='flex flex-wrap justify-start gap-[16px] w-[1280px] h-srceen'>
          {currentItems.map((job) => {
            return <JobCard job={job} key={job.job_id} />;
          })}
        </div>
        <div className="w-full flex justify-center items-center mt-[50px]">
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      </div>
      </div>
    </div>
  );
};
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