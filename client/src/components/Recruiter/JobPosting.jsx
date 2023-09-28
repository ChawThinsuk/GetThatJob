import React, { useState, useEffect } from "react";
import JobDetailBox from "./RecruiterComponent/JobDetailBox";
import { RadioJobPosting } from "./RecruiterComponent/Recruiter-1-2-Component";
import { useRecruiterContext } from "../../contexts/recruiterPage1-2";
import axios from "axios";
import { useQuery } from "react-query";
import { Skeleton, Spinner, SkeletonText } from "@chakra-ui/react";

function JobPosting(props) {
  const { jobPostingFilterState } = useRecruiterContext();
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
    return new Date(a.created_at) - new Date(b.created_at);
  });
  posts?.sort(sortByStatus);

  return (
    <JobContainer>
      <p className="font-[Montserrat] text-[35px] font-medium">Job Postings</p>
      <RadioJobPosting />

      <p className="font-[Montserrat] text-[21px] font-medium pt-[21.33px]">
        {posts?.length} jobs postings found
      </p>
      {posts?.map((item, key) => {
        return (
          <JobDetailBox
            key={key}
            datas={item}
            refreshData={refetch}
            fetching={isFetching}
          />
        );
      })}
    </JobContainer>
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
