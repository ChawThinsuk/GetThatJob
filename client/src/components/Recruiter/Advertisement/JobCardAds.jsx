import manufacturing from '../../../assets/pro2/category.svg';
import calendar from '../../../assets/pro2/calendar.svg';
import small from '../../../assets/pro2/money.svg';
import followOff from '../../../assets/pro2/followOff.svg';
import followOn from '../../../assets/pro2/followOn.svg';
import { Link } from 'react-router-dom';
import { usePro } from '../../../contexts/Professional.jsx';
import { useAuth } from '../../../contexts/Authorization.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';

const JobCardAds = (prop) => {
  const { state } = useAuth();
  const [follow, setFollow] = useState({});
  const { job } = prop;
  const { updateJobFollowStatus, addJobProfessionalData } = usePro();
  const [isLoading, setIsloading] = useState(false);
  const getJobFollowStatus = async () => {
    setIsloading(true);
    try {
      const jobFollowStatus = await axios.get(
        `http://localhost:4000/pro/follow/job`,
        {
          params: { userID: state.userID, job_id: job.job_id },
        }
      );
      setFollow(jobFollowStatus.data.data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);

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
    }
  };

  return (
    <div
      key={job.job_id}
      className='w-[400px] h-[180px] rounded-[8px] border-[1px] border-[#E1E2E1] bg-[#FFFFFF] flex justify-center items-center mr-[16px] shadow-pro1'
    >
      {isLoading ? (
        <Spinner
          thickness='4px'
          speed='2s'
          emptyColor='gray.200'
          color='#F48FB1'
          size='xl'
        />
      ) : (
        <div className='w-[345px] h-[195px] flex flex-col justify-center items-center'>
          <div className='flex flex-row w-[345px] h-[140px] gap-[10px]'>
            <div className='flex justify-center items-center'>
              <img src={job.logo} className='w-[100px] h-[100px]' />
            </div>
            <div className='flex flex-col w-[230px] h-[110px]'>
              <div className='flex flex-row gap-[5px]'>
                <img src={manufacturing} className='w-[20px] h-[20px]' />
                <p className='text-[16px] text-[#8E8E8E] min-w-[142px] h-[22px] font-[Inter] font-[400]'>
                  {job.job_category}
                </p>
              </div>
              <div className='flex flex-col w-[230px] h-[86px]'>
                <p className='text-[24px] text-[#373737] w-[270px] h-[32px] font-[Montserrat] font-[500]'>
                  {job.job_title}
                </p>
                <p className='text-[20px] text-[#616161] w-[230px] h-[24px] font-[Montserrat] font-[500]'>
                  {job.company_name}
                </p>
                <p className='text-[14px] text-[#616161] w-[230px] h-[24px] mt-[6px] font-[Montserrat] font-[500]'>
                  {job.job_location}
                </p>
              </div>
              <div className='flex flex-row justify-between items-center w-[230px] h-[27px] pt-[4px]'>
                <div className='flex flex-row justify-center items-center gap-[5px] w-[106px] h-[27px] '>
                  <img src={calendar} className='w-[20-px] h-[20px]' />
                  <p className='text-[16px] text-[#8E8E8E] w-[95px] h-[22px] font-[Inter] font-[400]'>
                    {job.job_type}
                  </p>
                </div>
                <div className='flex flex-row justify-center items-center min-w-[112px] h-[27px] '>
                  <img src={small} className='w-[20px] h-[20px]' />
                  <div className='flex flex-row justify-center items-center min-w-[86px] h-[22px]'>
                    <p className='text-[16px] text-[#8E8E8E] font-[Inter] font-[400]'>
                      {(job.salary_min / 1000).toFixed(1)}k
                    </p>
                    <p>-</p>
                    <p className='text-[16px] text-[#8E8E8E] font-[Inter] font-[400]'>
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
};
export default JobCardAds;
