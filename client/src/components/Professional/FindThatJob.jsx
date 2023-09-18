import find from "../../assets/FindThatJob/find.svg";
import money from "../../assets/FindThatJob/money.svg";
import { useEffect, useState } from "react";
import { usePro } from "../../contexts/Professional";
import { debounce } from "lodash";
import JobCard from "./JobCard";

export const FindThatJob = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const { jobs, setJobs, getJobs, isLoading } = usePro();
  useEffect(() => {
    getJobs({ searchTerm, category, type, minSalary, maxSalary });
  }, [searchTerm, category, type, minSalary, maxSalary]);

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-srceen pr-[100px] pl-[100px] pt-[50px] font-[Inter] bg-[#F5F5F6]">
      <div className="flex flex-col justify-center items-start w-full">
        <p className="text-[46px] text-start w-full font-[Montserrat]">
          Find That Job
        </p>
        <p className="text-[14px] pt-[16px]">
          SEARCH BY JOB TITLE OR COMPANY NAME
        </p>
        <div className="border-[1px] border-[#F48FB1] rounded-[8px] w-[560px] h-[42px] flex flex-row justify-start items-center bg-[#FFFFFF]">
          <img src={find} className="w-[22] h-[22] pl-2" />
          <input
            type="text"
            placeholder="manufacturing, sales, swim"
            className="w-[500px] h-[27px] text-[18px] p-[8px] leading-6 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-rows pt-[8px]">
          <div className="pr-[16px]">
            <label>
              <p className="text-[14px]">CATEGORY</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border-[1px] border-[#F48FB1] rounded-[8px] w-[375px] h-[42px] flex flex-row justify-center items-center text-[18px] p-[8px] text-[#8E8E8E]"
              >
                <option value={""}>Select a category</option>
                <option>Software Developer</option>
                <option>Sales</option>
                <option>Graphic Designer</option>
                <option>Digital Marketing</option>
              </select>
            </label>
          </div>
          <div className="pr-[16px]">
            <label>
              <p className="text-[14px]">TYPE</p>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border-[1px] border-[#F48FB1] rounded-[8px] w-[375px] h-[42px] flex flex-row justify-center items-center text-[18px] p-[8px] text-[#8E8E8E]"
              >
                <option value={""}>Select a type</option>
                <option>Full time</option>
                <option>Part time</option>
              </select>
            </label>
          </div>
          <div>
            <p className="text-[14px]">SALARY RANGE</p>
            <div className="flex flex-rows justify-between items-center w-[308px]">
              <div className="border-[1px] border-[#F48FB1] rounded-[8px] w-[136px] h-[42px] flex flex-row justify-start items-center bg-[#FFFFFF]">
                <img src={money} className="pl-2" />
                <input
                  type="text"
                  placeholder="min"
                  className="w-[77px] h-[27px] flex flex-col justify-center text-[18px] p-[8px] leading-6 outline-none"
                  onChange={(e) => setMinSalary(e.target.value)}
                />
              </div>
              <p>-</p>
              <div className="border-[1px] border-[#F48FB1] rounded-[8px] w-[136px] h-[42px] flex flex-row justify-start items-center bg-[#FFFFFF]">
                <img src={money} className="pl-2" />
                <input
                  type="text"
                  placeholder="max"
                  className="w-[77px] h-[27px] flex flex-col justify-center text-[18px] p-[8px] leading-6 outline-none"
                  onChange={(e) => setMaxSalary(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start w-full pt-[16px]">
        <div className="mb-[16px]">
          <p className="text-[20px] text-start w-full font-[Montserrat] font-[500]">
            {jobs.length} jobs for you
          </p>
        </div>
        <div className="flex flex-wrap justify-start gap-[16px] w-[1280px] h-srceen">
          {jobs.map((job) => (
            <JobCard job={job} key={job.job_id} />
          ))}
        </div>
      </div>
    </div>
  );
};