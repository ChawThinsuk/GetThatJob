import React, { useState } from "react";


function CandidateFilter() {
  const [value, setValue] = useState();
  return (
    <div className="mt-[16px] text-[#616161]">
      <p>{value}</p>
      <input type="radio" name="all" value="all" onChange={(e)=>{setValue(e.target.value)}} className="accent-[#BF5F82]"/>All
      <input type="radio" name="waiting" value="waiting" onChange={(e)=>{setValue(e.target.value)}} />Waiting
      <input type="radio" name="in_progress" value="in_progress" onChange={(e)=>{setValue(e.target.value)}} />In progress
      <input type="radio" name="finished" value="female" onChange={(e)=>{setValue(e.target.value)}} />Finished
    </div>
  );
}

export default CandidateFilter;
