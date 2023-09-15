import manufacturing from "../../assets/pro2/category.svg";
import calendar from "../../assets/pro2/calendar.svg";
import small from "../../assets/pro2/money.svg";
import followOff from "../../assets/pro2/followOff.svg";
import followOn from "../../assets/pro2/followOn.svg";
import { Link } from "react-router-dom";
import { usePro } from "../../contexts/Professional.jsx";
import { useAuth } from "../../contexts/Authorization.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const JobCard = (prop) => {
  const { state } = useAuth();
  const [ follow, setFollow ] = useState({});
  const { job } = prop;
  const { updateJobFollowStatus, addJobProfessionalData } = usePro();
  const getJobFollowStatus = async () => {
    try {
      const jobFollowStatus = await axios.get(
        `http://localhost:4000/pro/follow/job`,
        {
          params: { userID: state.userID, job_id: job.job_id },
        }
      );
      setFollow(jobFollowStatus.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobFollowStatus();
  }, []);

  const handleChangeStatus = async () => {
    if (follow) {
      let data = {
        job_professional_id: follow.job_professional_id,
        job_professional_follow: !follow.job_user_following,
      };
      updateJobFollowStatus(data);
      setFollow({ ...follow, job_user_following: !follow.job_user_following });
    } else {
      let data = {
        userID: state.userID,
        job_id: job.job_id,
      };
      addJobProfessionalData(data);
      setFollow({ job_user_following: true });
    };
  };

  return (
    <div
      key={job.job_id}
      className="w-[290px] h-[170px] rounded-[8px] border-[1px] border-[#E1E2E1] bg-[#FFFFFF] flex justify-center items-center mr-[16px] shadow-pro1"
    >
      <div className="w-[258px] h-[138px] flex flex-col justify-between items-center">
        <div className="flex flex-row w-[258px] h-[82px] gap-[8px]">
          <img src={job.logo} className="w-[80px] h-[80px]" />
          <div className="flex flex-col w-[170px] h-[82px]">
            <div className="flex flex-row gap-[4px]">
              <img src={manufacturing} className="w-[15px] h-[15px]" />
              <p className="text-[12px] text-[#8E8E8E] min-w-[106px] h-[16px]">
                {job.job_category}
              </p>
            </div>
            <div className="flex flex-col w-[170px] h-[48px]">
              <p className="text-[20px] text-[#373737] min-w-[200px] h-[28px]">
                {job.job_title}
              </p>
              <p className="text-[14px] text-[#616161] w-[170px] h-[18px]">
                {job.company_name}
              </p>
            </div>
            <div className="flex flex-row justify-between items-center w-[170px] h-[20px] pt-[4px]">
              <div className="flex flex-row justify-center items-center gap-[4px] w-[80px] h-[20px] ">
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
          <div
            className="w-[109px] h-[40px] flex flex-row justify-center items-center"
            onClick={handleChangeStatus}
          >
            <div className="w-[40px] h-[40px] flex flex-row justify-center items-center">
              <img
                src={follow && follow.job_user_following ? followOn : followOff}
                className="w-[24px] h-[24px]"
              />
            </div>
            <button className=" text-[14px] text-[#616161] font-[Inter] font-[500] tracking-[1.25px] w-[69px] h-[40px] flex flex-row justify-center items-center">
              {follow && follow.job_user_following ? " Following" : "Follow"}
            </button>
          </div>
          <Link to={`/${job.job_id}`}>
            <button className="w-[109px] h-[40px] border-[1px] border-[#F48FB1] rounded-xl hover:bg-[#F5F5F6] text-[14px] text-[#616161] font-[Inter] font-[500]">
              SEE MORE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default JobCard;
