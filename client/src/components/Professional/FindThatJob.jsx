import find from "../../../img/find.png";
import money from "../../../img/money.png";
import { useEffect, useState } from "react";
export const FindThatJob = ()=>{
  const [job, setJob] = useState()
  const [searchTerm, setSearchTerm] = useState()
  const [category, setCategory] = useState("");
  const [type, setType] = useState("")


  useEffect(()=> {
  });

  return <div className="flex flex-col justify-start items-center w-full pr-[100px] pl-[100px] pt-[50px] font-[Inter]">
    <div className="flex flex-col justify-center items-start w-full">
      <p className="text-[34px] text-start w-full font-[Montserrat]">Find That Job</p>
      <p className="text-[10px] pt-[16px]">SEARCH BY JOB TITLE OR COMPANY NAME</p>
      <div className="border-[1px] border-[#F48FB1] rounded-[8px] w-[420px] h-[36px] flex flex-row justify-start items-center">
        <img src={find} className="w-[16.93] h-[16.93] pl-2"/>
      <input
        type="text"
        placeholder="manufacturing, sales, swim"
        className="w-[376px] h-[20px] text-[14px] p-[8px] leading-6"
        />
      </div>
      <div className="flex flex-rows pt-[8px]">
        <div className="pr-[16px]">
          <label>
            <p className="text-[10px]">CATEGORY</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-[1px] border-[#F48FB1] rounded-[8px] w-[280px] h-[36px] flex flex-col justify-center text-[14px] p-[8px]"
            >
              <option disabled value="" className="text-[#8E8E8E]">
                Select a category
              </option>
              <option>Manufactoring</option>
            </select>
          </label>
        </div>
        <div className="pr-[16px]">
          <label>
          <p className="text-[10px]">TYPE</p>
          <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border-[1px] border-[#F48FB1] rounded-[8px] w-[280px] h-[36px] flex flex-col justify-center text-[14px] p-[8px]"
            >
              <option disabled value="" className="text-[#8E8E8E]">
                Select a type
              </option>
              <option>Full time</option>
              <option>Part-time</option>
            </select>
          </label>
        </div>
        <div>
          <p className="text-[10px]">SALARY RANGE</p>
          <div className="flex flex-rows justify-between items-center w-[231px]">
            <div className="border-[1px] border-[#F48FB1] rounded-[8px] w-[102px] h-[36px] flex flex-row justify-start items-center">
              <img src={money} className="pl-2"/>
              <input
                type="text"
                placeholder="min"
                className="w-[58px] h-[20px] flex flex-col justify-center text-[14px] p-[8px] leading-6"
              />
            </div>
            <p>-</p>
            <div className="border-[1px] border-[#F48FB1] rounded-[8px] w-[102px] h-[36px] flex flex-row justify-start items-center">
              <img src={money} className="pl-2"/>
              <input
                type="text"
                placeholder="max"
                className="w-[58px] h-[20px] flex flex-col justify-center text-[14px] p-[8px] leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-center items-start w-full pt-[16px]">
      <div>
        <p className="text-[20px] text-start w-full font-[Montserrat]">jobs for you</p>
      </div>
      <div></div>
    </div>
  </div>
}