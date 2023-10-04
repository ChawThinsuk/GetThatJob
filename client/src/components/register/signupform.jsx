import React, { useState } from "react";

import { useGlobalContext } from "../../contexts/registerContext.jsx";
import pointingGirl from "../../assets/register-images/woman-pointing.svg";
import SelectType from "./selectUserType.jsx";
import TalentFormProgress from "./TalentFormProgress.jsx";
import TalentFormProgress2 from "./TalentFormProgress2.jsx";
import TalentFormProgress3 from "./TalentFormProgress3.jsx";
import RecruiterFormProgress from "./RecruiterFormProgress.jsx";
import RecruiterFormProgress2 from "./RecruiterFormProgress2.jsx";

function Professional() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { registerPage, userType, recruiterRegisterPage } = useGlobalContext();

  // page = x

  return (
    <div className="flex w-full h-[50rem] mt-10">
      {/* Left */}
      <div className="flex flex-col w-[50%] font-[Inter]">
        <SelectType />
        {userType === "PROFESSIONAL" && registerPage === 1 && (
          <TalentFormProgress />
        )}
        {userType === "PROFESSIONAL" && registerPage === 2 && (
          <TalentFormProgress2 />
        )}
        {userType === "PROFESSIONAL" && registerPage === 3 && (
          <TalentFormProgress3 />
        )}
        {userType === "RECRUITER" && recruiterRegisterPage === 1 && (
          <RecruiterFormProgress />
        )}
        {userType === "RECRUITER" && recruiterRegisterPage === 2 && (
          <RecruiterFormProgress2 />
        )}
      </div>
      {/* Right */}
      <div className="flex w-[50%]  justify-center items-end relative">
      <img
  src={pointingGirl}
  alt="women pointing"
  width="55%"
  className={`absolute ${registerPage === 2 ? 'bottom-[-77px]' : registerPage === 3 ? 'bottom-[-107px]' : 'bottom-[-77px]'}`}
/>
      </div>
    </div>
  );
}

export default Professional;
