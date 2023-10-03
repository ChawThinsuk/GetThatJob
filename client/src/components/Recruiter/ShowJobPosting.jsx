import React, { useState, useEffect } from "react";
import Candidate from "./RecruiterComponent/CandidateBox";
import axios from "axios";
import { useRecruiterContext } from "../../contexts/recruiterPage1-2";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import JobDetailBox from "./RecruiterComponent/JobDetailBox";
import { Spinner, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RadioCandidate } from "./RecruiterComponent/Recruiter-1-2-Component";
import backArrow from "../../assets/recruiter-2/arrow-left-icon.svg";

function ShowJobPosting() {
  const param = useParams();
  const { candidateFilterState } = useRecruiterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  let data = {
    job_id: param.id,
    job_user_mark: candidateFilterState,
  };
  function sortByStatus(a, b) {
    if (a.job_user_mark < b.job_user_mark) {
      return 1;
    }
    if (a.job_user_mark > b.job_user_mark) {
      return -1;
    }
    return 0;
  }
  const {
    data: job,
    error: errorR,
    loading: loadingR,
    refetch: refetchR,
  } = useQuery({
    queryKey: ["jobs", data],
    queryFn: async (data) => {
      const response = await axios.post(
        "http://localhost:4000/recruiter-display/getjob",
        data.queryKey[1]
      );
      return response.data;
    },
  });
  async function getCandidate(data) {
    const response = await axios.post(
      "http://localhost:4000/recruiter-display/getcandidate",
      data.queryKey[1]
    );
    return response.data.data;
  }
  const {
    data: candidates,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["candidates", data],
    queryFn: async (data) => {
      return getCandidate(data);
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
  candidates?.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  candidates?.sort(sortByStatus);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = candidates?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((candidates?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-[#F5F5F6] w-[1565px]">
    <ShowJobContainer>
      <Link to={`/`}>
        <BackButton>
          <img src={backArrow} />
          Back
        </BackButton>
      </Link>
      <p className="text-[35px] font-[Montserrat] mt-[21.33]">
        Show Job Posting
      </p>
      {job?.map((item, key) => {
        return <JobDetailBox key={key} datas={item} refreshData={refetchR} />;
      })}
      <RadioCandidate page={setCurrentPage}/>
      <p className="text-[21px] font-[Montserrat] font-medium mt-[16px]">
        {candidates?.length} candidates found
      </p>
      {currentItems?.map((item, key) => {
        return (
          <Candidate
            key={key}
            datas={item}
            refreshData={refetch}
            jobRefreshData={refetchR}
          />
        );
      })}
      <div className="w-full flex justify-center items-center mt-[30px] mb-[30px]">
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      </div>
    </ShowJobContainer>
    </div>
  );
}

export default ShowJobPosting;

function ShowJobContainer({ children }) {
  return (
    <div className="w-[1259px] flex flex-col  items-start font-[Inter] ml-[160px] mr-[160px] pt-[32px]">
      {children}
    </div>
  );
}
function BackButton({ children }) {
  return (
    <button className="flex flex-row text-[#616161] text-[15px] font-medium">
      {children}
    </button>
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