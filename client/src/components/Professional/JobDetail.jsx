import { Link, useParams } from 'react-router-dom';
import leftArrow from '../../assets/pro2/leftArrow.svg';
import applyicon from '../../assets/pro2/applyicon.svg';
import { JobHeader } from './JobHeader';
import { usePro } from '../../contexts/Professional';
import { useQuery } from 'react-query';
import { Spinner } from '@chakra-ui/react';

export const JobDetail = () => {
  const { getSingleJob } = usePro();
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(['job', id], () =>
    getSingleJob(id)
  );
  if (isLoading) {
    return (
      <div className='w-screen h-screen opacity-80 bg-white flex justify-center items-center'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='#F48FB1'
          size='xl'
        />
      </div>
    );
  }
  if (error) {
    return (
      <div className='absolute w-screen h-screen flex flex-col items-center pt-20'>
        <h1 className='text-[3rem] font-bold text-[#373737] '>
          Something wrong
        </h1>
        <div className='flex mt-5 gap-10'>
          <Link to='/'>
            <h1 className=' text-blue-700 text-[1.2rem] underline hover:cursor-pointer hover:text-blue-800'>
              Back to homepage
            </h1>
          </Link>
          <h1
            className=' text-blue-700 text-[1.2rem] underline hover:cursor-pointer hover:text-blue-800'
            onClick={() => window.location.reload(true)}
          >
            Retry
          </h1>
        </div>
      </div>
    );
  }

  if (!data.data.job) {
    return (
      <div className='absolute w-screen h-screen flex flex-col items-center pt-20'>
        <h1 className='text-[3rem] font-bold text-[#373737] '>
          JOB NOT FOUNDED
        </h1>
        <div className='flex mt-5 gap-10'>
          <Link to='/'>
            <h1 className=' text-blue-700 text-[1.2rem] underline hover:cursor-pointer hover:text-blue-800'>
              Back to homepage
            </h1>
          </Link>
          <h1
            className=' text-blue-700 text-[1.2rem] underline hover:cursor-pointer hover:text-blue-800'
            onClick={() => window.location.reload(true)}
          >
            Retry
          </h1>
        </div>
      </div>
    );
  }

  let { company_description, job_position, job_mandatory, job_optional } =
    data.data.job;

  return (
    <div className='flex flex-col w-full min-h-screen bg-[#F5F5F6] pt-8 pl-[10%] pr-[10%] pb-[40px]'>
      <Link to='/'>
        <button className='flex items-center h-[24px]'>
          <img src={leftArrow} className='w-[24px] h-[24px]' />
          <p className=' font-[Inter] text-[14px] text-[#616161]'>BACK</p>
        </button>
      </Link>
      <div className='flex flex-col mt-[10px]'>
        <JobHeader />
        {/*------------------------------------------------------Job Detail Section-----------------------------------------------*/}
        <section className='flex flex-col mt-[54px] px-[16px] gap-[16px]'>
          <div className='flex flex-col gap-[8px]'>
            <h1 className='text-[24px] text-[#BF5F82] font-[400] font-[Montserrat]'>
              About The company name SA
            </h1>
            <p className='w-[760px] text-[16px] text-[#373737] font-[400] font-[Inter] leading-[24px] tracking-[0.5px]'>
              {company_description}
            </p>
          </div>
          <div className='flex flex-col gap-[8px]'>
            <h1 className='text-[24px] text-[#BF5F82] font-[400] font-[Montserrat]'>
              About the job position
            </h1>
            <p className='w-[760px] text-[16px] text-[#373737] font-[400] font-[Inter] leading-[24px] tracking-[0.5px]'>
              {job_position}
            </p>
          </div>
          <div className='flex flex-col  gap-[3px]'>
            <h1 className='text-[24px] text-[#BF5F82] font-[400] font-[Montserrat] mb-[5px]'>
              Mandatory Requirements
            </h1>
            {job_mandatory &&
              job_mandatory
                .split('- ')
                .filter(Boolean)
                .map((text, index) => {
                  return (
                    <p
                      className='w-[760px] text-[16px] text-[#373737] font-[400] font-[Inter]  tracking-[0.5px]'
                      key={index}
                    >
                      - {text}
                    </p>
                  );
                })}
          </div>{' '}
          <div className='flex flex-col gap-[3px]'>
            <h1 className='text-[24px] text-[#BF5F82] font-[400] font-[Montserrat] mb-[5px]'>
              Optional Requirements
            </h1>
            {job_optional &&
              job_optional
                .split('- ')
                .filter(Boolean)
                .map((text, index) => {
                  return (
                    <p
                      className='w-[760px] text-[16px] text-[#373737] font-[400] font-[Inter] tracking-[0.5px]'
                      key={index}
                    >
                      - {text}
                    </p>
                  );
                })}
          </div>
          <div className='flex justify-center mt-5'>
            <button className='flex items-center justify-center gap-[8px] bg-[#F48FB1] hover:bg-[#de7b9c] w-[173px] h-[56px] py-[16px] px-[20px] rounded-[16px] transition-all duration-300'>
              <img src={applyicon} className='w-[24px] h-[24px]' />
              <p className='text-[14px] text-white font-[Inter] tracking-[1.25px] '>
                APPLY NOW
              </p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
