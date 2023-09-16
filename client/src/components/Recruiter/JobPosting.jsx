import React, { useState,useEffect } from "react";
import JobDetailBox from "./RecruiterPage2/JobDetailBox";


function JobPosting() {

  return (
    <div className="w-[1259px] flex flex-col items-start font-[Inter] ml-[160px] mr-[160px] pt-[32px]">
        <JobDetailBox />
    </div>
  );
}

export default JobPosting;
