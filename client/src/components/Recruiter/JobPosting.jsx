import React, { useState, useEffect } from "react";
import JobDetailBox from "./RecruiterComponent/JobDetailBox";
import { RadioJobPosting } from "./RecruiterComponent/Recruiter-1-2-Component";
import { useRecruiterContext } from "../../contexts/recruiterPage1-2";
import axios from "axios";
import { useQuery } from "react-query";
import { Skeleton, Spinner, SkeletonText } from "@chakra-ui/react";

function JobPosting(props) {
  const { jobPostingFilterState } = useRecruiterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const data = {
    job_status: jobPostingFilterState,
    user_id: props.id,
  };
  function sortByStatus(a, b) {
    if (a.job_status < b.job_status) {
      return 1;
    }
    if (a.job_status > b.job_status) {
      return -1;
    }
    return 0;
  }
  async function getJopPosting(data) {
    const response = await axios.post(
      "http://localhost:4000/recruiter-display/get-job-posting",
      data.queryKey[1]
    );
    return response.data;
  }
  const {
    data: posts,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["jobPosts", data],
    queryFn: async (data) => {
      return getJopPosting(data);
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <Spinner color="pink.200" size="lg" />
      </div>
    );
  }
  if (error) {
    return <div>Error Loading</div>;
  }
  posts?.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  posts?.sort(sortByStatus);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((posts?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="bg-[#F5F5F6] w-[1565px]">
    <JobContainer>
      <p className="font-[Montserrat] text-[35px] font-medium">Job Postings</p>
      <RadioJobPosting page={setCurrentPage}/>
      <p className="font-[Montserrat] text-[21px] font-medium pt-[21.33px]">
        {posts?.length} jobs postings found
      </p>      
      {currentItems?.map((item, key) => {
        return (
          <JobDetailBox
            key={key}
            datas={item}
            refreshData={refetch}
            fetching={isFetching}
          />
        );
      })}
      <div className="w-full flex justify-center items-center mt-[50px] mb-[30px]">
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      </div>
    </JobContainer>
    </div>
  );
}

export default JobPosting;

function JobContainer({ children }) {
  return (
    <div className="w-[1259px] flex flex-col  items-start font-[Inter] ml-[160px] mr-[160px] pt-[32px]">
      {children}
    </div>
  );
}
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