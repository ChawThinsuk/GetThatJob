import manufacturing from '../../../assets/pro2/category.svg';
import calendar from '../../../assets/pro2/calendar.svg';
import small from '../../../assets/pro2/money.svg';
import { useAuth } from '../../../contexts/Authorization.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';

const JobCardAds = ({prop}) => {
  const {selectedJobs, setSelectedJobs} = prop
  const { state } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getJobs = async () => {
    setIsLoading(true)
    try {
      const result = await axios.get(`http://localhost:4000/ads/${state.userID}`);
      setJobs(result.data.data.rows);
      setIsLoading(false)
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleCardClick = (job) => {
    setSelectedJobs(job.job_id);
  }
  
  return (
    <div className='flex flex-wrap justify-start gap-[16px] w-[950px] h-srceen'>
    {jobs.map((job) => {
        return(
        <div
          key={job.job_id}
          onClick={() => handleCardClick(job)}
          className={`w-[290px] h-[130px] rounded-[8px] border-[4px] border-[#E1E2E1] bg-[#FFFFFF] flex justify-center items-center mr-[16px] shadow-pro1 hover:cursor-pointer ${selectedJobs === (job.job_id) ? "border-[#F48FB1] border-[4px]" : ""} `}
        >
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="2s"
              emptyColor="gray.200"
              color="#F48FB1"
              size="xl"
            />
          ) : (
            <div className="w-[95%] h-[120px] flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center w-[90%] h-[90%]">
                <div className="flex flex-col w-full h-full">
                  <div className="flex flex-row gap-[5px] w-full h-[24px]">
                    <img src={manufacturing} className="w-[20px] h-[20px]" />
                    <p className="text-[16px] text-[#8E8E8E] min-w-[142px] h-[22px] font-[Inter] font-[400]">
                      {job.job_category}
                    </p>
                  </div>
                  <div className="flex flex-col w-full h-[56px]">
                    <p className="text-[24px] text-[#373737] w-full h-[32px] font-[Montserrat] font-[500]">
                      {job.job_title}
                    </p>
                    <p className="text-[14px] text-[#616161] w-full h-[24px] mt-[6px] font-[Montserrat] font-[500]">
                      {job.job_location}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full h-[27px] pt-[4px]">
                    <div className="flex flex-row justify-center items-center gap-[5px] w-[106px] h-[27px] ">
                      <img src={calendar} className="w-[20-px] h-[20px]" />
                      <p className="text-[16px] text-[#8E8E8E] w-[95px] h-[22px] font-[Inter] font-[400]">
                        {job.job_type}
                      </p>
                    </div>
                    <div className="flex flex-row justify-center items-center min-w-[112px] h-[27px] ">
                      <img src={small} className="w-[20px] h-[20px]" />
                      <div className="flex flex-row justify-center items-center min-w-[86px] h-[22px]">
                        <p className="text-[16px] text-[#8E8E8E] font-[Inter] font-[400]">
                          {(job.salary_min / 1000).toFixed(1)}k
                        </p>
                        <p>-</p>
                        <p className="text-[16px] text-[#8E8E8E] font-[Inter] font-[400]">
                          {(job.salary_max / 1000).toFixed(1)}k
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        );
      })}
    </div>
  );
};
export default JobCardAds;
