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
  // --------------------------------------Data fetching using react-query----------------------------------------------------
  const { data, isLoading, error } = useQuery(['job', id], () =>
    getSingleJob(id)
  );
  //------------Loading-----------
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
  //------------Error-----------
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
  //------------No data case-----------
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
  // destructure data
  let {
    company_description,
    job_position,
    job_mandatory,
    job_optional,
    job_id,
  } = data.data.job;
  return (
    <div className='flex flex-col w-full min-h-screen bg-[#F5F5F6] pt-8 pl-[10%] pr-[10%] pb-[53.336px]'>
      <Link to='/'>
        <button className='flex items-center h-[32.001px]'>
          <img src={leftArrow} className='w-[32.001px] h-[32.001px]' />
          <p className=' font-[Inter] text-[22px] text-[#616161]'>BACK</p>
        </button>
      </Link>
      <div className='flex flex-col mt-[13.334px]'>
        <JobHeader data={data.data.job} page='jobDetail' />
        {/*------------------------------------------------------Job Detail Section-----------------------------------------------*/}
        <section className='flex flex-col mt-[72.003px] px-[21.334px] gap-[21.334px]'>
          <div className='flex flex-col gap-[10.667px]'>
            <h1 className='text-[32.001px] text-[#BF5F82] font-[400] font-[Montserrat]'>
              About The company name SA
            </h1>
            <p className='w-[1013.384px] text-[21.334px] text-[#373737] font-[400] font-[Inter] leading-[32.001px] tracking-[0.668px]'>
              {company_description}
            </p>
          </div>
          <div className='flex flex-col gap-[10.667px]'>
            <h1 className='text-[32.001px] text-[#BF5F82] font-[400] font-[Montserrat]'>
              About the job position
            </h1>
            <p className='w-[1013.384px] text-[21.334px] text-[#373737] font-[400] font-[Inter] leading-[32.001px] tracking-[0.668px]'>
              {job_position}
            </p>
          </div>
          <div className='flex flex-col  gap-[4.0002px]'>
            <h1 className='text-[32.001px] text-[#BF5F82] font-[400] font-[Montserrat] mb-[6.667px]'>
              Mandatory Requirements
            </h1>
            {job_mandatory &&
              job_mandatory
                .split('- ')
                .filter(Boolean)
                .map((text, index) => {
                  return (
                    <p
                      className='w-[1013.384px] text-[21.334px] text-[#373737] font-[400] font-[Inter]  tracking-[0.668px]'
                      key={index}
                    >
                      - {text}
                    </p>
                  );
                })}
          </div>{' '}
          <div className='flex flex-col gap-[4.0002px]'>
            <h1 className='text-[32.001px] text-[#BF5F82] font-[400] font-[Montserrat] mb-[6.667px]'>
              Optional Requirements
            </h1>
            {job_optional &&
              job_optional
                .split('- ')
                .filter(Boolean)
                .map((text, index) => {
                  return (
                    <p
                      className='w-[1013.384px] text-[21.334px] text-[#373737] font-[400] font-[Inter] tracking-[0.668px]'
                      key={index}
                    >
                      - {text}
                    </p>
                  );
                })}
          </div>
          <div className='flex justify-center mt-5'>
            <Link to={`/apply/${job_id}`}>
              <button className='flex items-center justify-center gap-[10.667px] bg-[#F48FB1] hover:bg-[#de7b9c] w-[230.678px] h-[74.670px] py-[21.334px] px-[26.668px] rounded-[21.334px] transition-all duration-300'>
                <img src={applyicon} className='w-[32.001px] h-[32.001px]' />
                <p className='text-[18.667px] text-white font-[Inter] tracking-[1.668px] '>
                  APPLY NOW
                </p>
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
