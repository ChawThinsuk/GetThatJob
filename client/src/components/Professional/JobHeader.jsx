import category from '../../assets/pro2/category.svg';
import calendar from '../../assets/pro2/calendar.svg';
import money from '../../assets/pro2/money.svg';
import followOn from '../../assets/pro2/followOn.svg';
import followOff from '../../assets/pro2/followOff.svg';
import time from '../../assets/pro2/time.svg';
import applyicon from '../../assets/pro2/applyicon.svg';
import { usePro } from '../../contexts/Professional';
import { useAuth } from '../../contexts/Authorization';
import { useEffect } from 'react';
export const JobHeader = (props) => {
  const { state } = useAuth();
  const { getJobFollowStatus, dayAgo, jobFollow } = usePro();
  const {
    logo,
    company_name,
    job_title,
    job_type,
    job_category,
    salary_max,
    salary_min,
    job_created_at,
    job_id,
  } = props.data;
  useEffect(() => {
    getJobFollowStatus(state.userID, job_id);
  }, []);
  console.log(jobFollow);
  return (
    <div className='w-[960px'>
      {/*---------------------------------------------------------Company Logo Section-------------------------------------------*/}
      <section className='flex justify-between mt-[16px]'>
        <div className='flex  gap-[16px]'>
          <img src={logo} className='w-[80px] h-[80px]' />
          <div>
            <p className='text-[24px] font-[Montserrat]'>{company_name}</p>
            <div className='flex items-center gap-[4px] w-[120px] hover:cursor-pointer '>
              <img
                src={
                  jobFollow && jobFollow.job_user_following
                    ? followOn
                    : followOff
                }
                className='w-[40px] h-[40px]'
              />
              <p className=' text-[14px]  text-[#616161] font-[Inter] font-[400] tracking-[1.25px]'>
                {jobFollow && jobFollow.job_user_following
                  ? ' Following'
                  : 'Follow'}
              </p>
            </div>
          </div>
        </div>
        <button className='flex items-center justify-center gap-[8px] bg-[#F48FB1] hover:bg-[#de7b9c] w-[173px] h-[56px] py-[16px] px-[20px] rounded-[16px] transition-all duration-300'>
          <img src={applyicon} className='w-[24px] h-[24px]' />
          <p className='text-[14px] text-white font-[Inter] tracking-[1.25px] '>
            APPLY NOW
          </p>
        </button>
      </section>
      {/*------------------------------------------------------Job Title Section-----------------------------------------------*/}
      <section className='flex flex-col items-center mt-[10px]'>
        <h1 className='text-[48px] text-[#373737] font-[400] font-[Montserrat] '>
          {job_title.toUpperCase()}
        </h1>
        <div className='flex gap-[4px]'>
          <img src={time} className='w-[15px] h-[15px]' />
          <p className='text-[10px] font-[Inter] tracking-[1.5px]'>
            posted{' '}
            {dayAgo(job_created_at) === 0
              ? 'Today'
              : dayAgo(job_created_at) === 1
              ? '1 day ago'
              : `${dayAgo(job_created_at)} days ago`}
          </p>
        </div>
        {/*boxes div*/}
        <div className='flex gap-[32px] mt-[20px]'>
          <div className='flex flex-col items-center w-[281px] h-[77px] pt-[8px] pb-[16px] px-[32px] border-[1px] border-[#BF5F82] bg-white rounded-[8px] shadow-pro2'>
            <p className='text-[16px] text-[#616161] font-[400] font-[Montserrat] tracking-[0.15px]'>
              Category
            </p>
            <div className='flex items-center gap-2 '>
              <img src={category} className='w-[29px] h-[29px]' />
              <p className='text-[24px] text-[#373737] font-[400] font-[Montserrat]'>
                {job_category}
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center w-[208px] h-[77px] pt-[8px] pb-[16px] px-[28px] border-[1px] border-[#BF5F82] bg-white rounded-[8px] shadow-pro2'>
            <p className='text-[16px] text-[#616161] font-[400] font-[Montserrat] tracking-[0.15px]'>
              Type
            </p>
            <div className='flex items-center gap-2 '>
              <img src={calendar} className='w-[29px] h-[29px]' />
              <p className='text-[24px] text-[#373737] font-[400] font-[Montserrat]'>
                {job_type}
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center min-w-[280px] h-[77px] pt-[8px] pb-[16px] px-[32px] border-[1px] border-[#BF5F82] bg-white rounded-[8px] shadow-pro2'>
            <p className='text-[16px] text-[#616161] font-[400] font-[Montserrat] tracking-[0.15px]'>
              Salary
            </p>
            <div className='flex items-center gap-2 '>
              <img src={money} className='w-[29px] h-[29px]' />
              <p className='text-[24px] text-[#373737] font-[400] font-[Montserrat]'>
                {salary_min} - {salary_max}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
