import React, { useState } from "react";
import { useGlobalContext } from "../../contexts/registerContext";

function SelectType() {
  const { userType, setUserType } = useGlobalContext();

  return (
    <div className="flex flex-col w-[100%] items-end font-[Inter] mb-[32px]">
      <div className="flex flex-col w-[80%] font-[Montserrat] mb-[32px]">
        <h2 className="text-[48px] mb-[16px]">Good choice!</h2>
        <h4 className="text-[20px]">Create a new account as...</h4>
      </div>
      {/* Register */}
      <div className="flex flex-col w-[80%] ">
        <div className="flex">
          <button
            className={`border-b-2 m-1 ${
              userType === "PROFESSIONAL"
                ? "border-[#F48FB1] text-[14px] text-black"
                : "border-[#BDBDBD] text-[14px] text-[#8E8E8E]"
            } `}
            onClick={() => setUserType("PROFESSIONAL")}
          >
            PROFESSIONAL
          </button>
          <button
            className={`border-b-2 m-1 ${
              userType === "RECRUITER"
                ? "border-[#F48FB1] text-[14px] text-black"
                : "border-[#BDBDBD] text-[14px] text-[#8E8E8E]"
            } `}
            onClick={() => setUserType("RECRUITER")}
          >
            RECRUITER
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectType;
