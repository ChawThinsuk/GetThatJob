import React, { useState } from "react";
import JobDetailBox from "./JobDetailBox";

function JobShowing() {
  return (
    <div className="w-full mt-[16px]">
      <h1 className="w-full font-[Montserrat] text-[45px] text-[#373737]">
        Show Job Posting
      </h1>
      <JobDetailBox />
    </div>
  );
}

export default JobShowing;
