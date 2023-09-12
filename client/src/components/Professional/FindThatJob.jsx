import find from "../../assets/FindThatJob/find.svg";
import money from "../../assets/FindThatJob/money.svg";
import manufacturing from "../../assets/pro2/category.svg";
import calendar from "../../assets/pro2/calendar.svg";
import small from "../../assets/pro2/money.svg";
import follow from "../../assets/pro2/followOff.svg";
import { useEffect, useState } from "react";
import { usePro } from "../../contexts/Professional";
import { Link } from "react-router-dom";
import { forOwn } from "lodash";
export const FindThatJob = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const { jobs, setJobs, getJobs, isLoading } = usePro();
  useEffect(() => {
    getJobs({ category });
  }, [category]);

  return (
    <div className="flex flex-col justify-start items-center w-full pr-[100px] pl-[100px] pt-[50px] font-[Inter] bg-[#F5F5F6]">
      <div className="flex flex-col justify-center items-start w-full">
        <p className="text-[34px] text-start w-full font-[Montserrat]">
          Find That Job
        </p>
        <p className="text-[10px] pt-[16px]">
          SEARCH BY JOB TITLE OR COMPANY NAME
        </p>
        <div className="border-[1px] border-[#F48FB1] rounded-[8px] w-[420px] h-[36px] flex flex-row justify-start items-center bg-[#FFFFFF]">
          <img src={find} className="w-[16.93] h-[16.93] pl-2" />
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
              <div className="border-[1px] border-[#F48FB1] rounded-[8px] w-[102px] h-[36px] flex flex-row justify-start items-center bg-[#FFFFFF]">
                <img src={money} className="pl-2" />
                <input
                  type="text"
                  placeholder="min"
                  className="w-[58px] h-[20px] flex flex-col justify-center text-[14px] p-[8px] leading-6"
                />
              </div>
              <p>-</p>
              <div className="border-[1px] border-[#F48FB1] rounded-[8px] w-[102px] h-[36px] flex flex-row justify-start items-center bg-[#FFFFFF]">
                <img src={money} className="pl-2" />
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
          <p className="text-[20px] text-start w-full font-[Montserrat]">
            jobs for you
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-[16px] w-[960px] h-srceen">
          {jobs.map((job) => {
            return (
              <div
                key={job.job_id}
                className="w-[290px] h-[170px] rounded-[1px] bg-[#FFFFFF] flex justify-center items-center"
              >
                <div className="w-[258px] h-[138px] flex flex-col justify-between items-center">
                  <div className="flex flex-row w-[258px] h-[82px] gap-[8px]">
                    <img src={job.logo} className="w-[80px] h-[80px]" />
                    <div className="flex flex-col w-[170px] h-[82px]">
                      <div className="flex flex-row gap-[4px]">
                        <img
                          src={manufacturing}
                          className="w-[15px] h-[15px]"
                        />
                        <p className="text-[12px] text-[#8E8E8E] w-[106px] h-[16px]">
                          {job.job_category}
                        </p>
                      </div>
                      <div className="flex flex-col w-[170px] h-[48px]">
                        <p className="text-[20px] text-[#373737] w-[170px] h-[28px]">
                          {job.job_title}
                        </p>
                        <p className="text-[14px] text-[#616161] w-[170px] h-[18px]">
                          {job.company_name}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center w-[170px] h-[20px] pt-[4px]">
                        <div className="flex flex-row justify-center items-center gap-[4px] w-[70px] h-[20px] ">
                          <img src={calendar} className="w-[15px] h-[16px]" />
                          <p className="text-[12px] text-[#8E8E8E] w-[70px] h-[16px]">
                            {job.job_type}
                          </p>
                        </div>
                        <div className="flex flex-row justify-center items-center min-w-[84px] h-[20px] ">
                          <img src={small} className="w-[15px] h-[16px]" />
                          <div className="flex flex-row justify-center items-center min-w-[65px] h-[16px]">
                            <p className="text-[12px] text-[#8E8E8E]">
                              {(job.salary_min / 1000).toFixed(1)}k
                            </p>
                            <p>-</p>
                            <p className="text-[12px] text-[#8E8E8E]">
                              {(job.salary_max / 1000).toFixed(1)}k
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between w-[258px] h-[40px] pt-[4px]">
                    <div className="w-[109px] h-[40px] flex flex-row justify-between items-center">
                      <div className="w-[40px] h-[40px] p-[8px] gap-[10px]">
                        <img src={follow} className="w-[24px] h-[24px]" />
                      </div>
                      <button>FOLLOW</button>
                    </div>
                    <Link to={`/${job.job_id}`}>
                      <button className="w-[109px] h-[40px] border-[1px] border-[#F48FB1] rounded-xl hover:bg-[#F5F5F6]">
                        SEE MORE
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
