import React, { useState,useEffect } from "react";
import CandidateFilter from "./RecruiterPage2/CandidateFilter";
import Candidate from "./RecruiterPage2/Candidate";
import JobShowing from "./RecruiterPage2/JobShowing";
import axios from "axios";

function ShowJobPosting(props) {
  const [candidate, setCandidate] = useState([
    {data:"asdasd"},
    {data:"asdasd"}
  ]);
  console.log(props)
  // const getPost = async () => {
  //   try {
  //     const data = {
  //       "job_user_mark": "alls",
  //       "job_id": 2
  //   };
  //     const response = await axios.post(
  //       "http://localhost:4000/chaw/getcandidate",
  //       data); 
  //       console.log(response)
  //     setCandidate(response)  
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };
  // useEffect(() => {
  //   getPost()
  // },[])

  function getClosedDate(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const closeDate = `${day}/${month}/${year.toString().slice(-2)}`;
    return closeDate;
  }

  return (
    <div className="w-[1259px] flex flex-col items-start font-[Inter] ml-[160px] mr-[160px] pt-[32px]">
      <button className="flex flex-rpw">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group">
            <path
              id="Vector"
              d="M10.828 12L15.778 16.95L14.364 18.364L8 12L14.364 5.63599L15.778 7.04999L10.828 12Z"
              fill="#616161"
            />
          </g>
        </svg>
        Back
      </button>
      <JobShowing />
      <CandidateFilter />
      <p className="text-[20px] font-[Montserrat] font-medium mt-[16px]">
        5 candidates found
      </p>
      {candidate.map((item, key) => (
        <Candidate key={key} datas={item} />
      ))}
    </div>
  );
}

export default ShowJobPosting;
