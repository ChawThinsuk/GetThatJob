import manufacturing from '../../assets/pro2/category.svg';
import calendar from '../../assets/pro2/calendar.svg';
import small from '../../assets/pro2/money.svg';
import followOff from '../../assets/pro2/followOff.svg';
import followOn from '../../assets/pro2/followOn.svg';
import { Link } from 'react-router-dom';
import { usePro } from '../../contexts/Professional.jsx';
import { useAuth } from '../../contexts/Authorization.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';

const JobCard = (prop) => {
  const { state } = useAuth();
  const [follow, setFollow] = useState({});
  const { job,index,page } = prop;
  const { updateJobFollowStatus, addJobProfessionalData } = usePro();
  const [isLoading, setIsloading] = useState(false);
  const paidAmount = job.job_payment_accumulation
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
      className='w-[400px] h-[227px] rounded-[8px] border-[1px] border-[#E1E2E1] bg-[#FFFFFF] flex justify-center items-center mr-[16px] shadow-pro1'
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
        <div className='w-[345px] h-[195px] flex flex-col justify-between items-center relative'>
             <div className='flex absolute bottom-[52.5px] left-[-19px] font-[Montserrat] rounded-xl text-yellow-400 font-semibold'>{index < 3 && page===1 && paidAmount > 0 && <div title="Save" class=" flex items-center fill-pink-300   rounded-md duration-100 p-2">
  <svg viewBox="0 -0.5 25 25" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z" clip-rule="evenodd" fill-rule="evenodd"></path>
  </svg>
  <span class="text-sm text-pink-300 font-bold pr-1">Recommend</span>
</div>}</div>
          <div className='flex flex-row w-[345px] h-[110px] gap-[10px]'>
            <img src={job.logo} className='w-[100px] h-[100px]' />
            <div className='flex pl-2 flex-col w-[230px] h-[110px]'>
              <div className='flex flex-row gap-[5px]'>
                <img src={manufacturing} className='w-[20px] h-[20px]' />
                <p className='text-[16px] text-[#8E8E8E] min-w-[142px] h-[22px] font-[Inter] font-[400]'>
                {job.job_category.slice(0,18)}<span className={`${job.job_category.length < 19 && "hidden"}`}>...</span>
                </p>
              </div>
              <div className='flex flex-col w-[230px] h-[86px]'>
                <p className='text-[22px] text-[#373737] w-[270px] h-[32px] font-[Montserrat] font-[500]'>
                  {job.job_title}
                </p>
                <p className='text-[15px] text-[#616161] w-[230px] h-[24px] font-[Montserrat] font-[500]'>
                  {job.company_name}
                </p>
                <p className='text-[15px] text-[#616161] w-[230px] h-[24px] mt-[3px] font-[Montserrat] font-[500]'>
                  {job.job_location}
                </p>
              </div>
              <div className='flex flex-row justify-between items-center w-[230px] h-[27px] pt-[4px]'>
                <div className='flex flex-row justify-center items-center gap-[5px] w-[106px] h-[27px] mt-2 '>
                  <img src={calendar} className='w-[20-px] h-[20px]' />
                  <p className='text-[14px] text-[#8E8E8E] w-[95px] h-[22px] font-[Inter] font-[400]'>
                    {job.job_type}
                  </p>
                </div>
                <div className='flex flex-row justify-center items-center min-w-[112px] h-[27px] mt-2'>
                  <img src={small} className='w-[20px] h-[20px]' />
                  <div className='flex flex-row justify-center items-center min-w-[86px] h-[22px]'>
                    <p className='text-[14px] text-[#8E8E8E] font-[Inter] font-[400]'>
                      {(job.salary_min / 1000).toFixed(1)}k
                    </p>
                    <p>-</p>
                    <p className='text-[14px] text-[#8E8E8E] font-[Inter] font-[400]'>
                      {(job.salary_max / 1000).toFixed(1)}k
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row justify-between w-[345px] h-[54px] pt-[5px]'>
            <div
              className='w-[147px] h-[54px] flex flex-row justify-start items-center'
              onClick={handleChangeStatus}
            >
              <div className='w-[85%] h-[53px] flex flex-row justify-start items-center cursor-pointer gap-[5px] '>
                <img
                  src={
                    follow && follow.job_user_following ? followOn : followOff
                  }
                  className='w-[32px] h-[32px]'
                />
                <button className=' text-[17px] text-[#616161] font-[Inter] font-[500] tracking-[1.25px] mw-[92px] h-[54px] flex flex-row justify-center items-center uppercase ml-[5px]'>
                  {follow && follow.job_user_following
                    ? ' Following'
                    : 'Follow'}
                </button>
              </div>
            </div>
            {follow && follow.job_user_application ? (
              <button
                disabled
                className='w-[142px] h-[49px] border-none bg-[#E1E2E1] rounded-3xl tracking-widest  text-[17px] text-[#616161] font-[Inter] font-[500]'
              >
                APPLIED
              </button>
            ) : (
              <Link to={`/${job.job_id}`}>
                <button className='w-[142px] h-[49px] border-[1px] border-[#F48FB1] tracking-wide  rounded-3xl hover:bg-[#F48FB126] text-[16px] text-[#616161] font-[Inter] font-[500]'>
                  SEE MORE
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default JobCard;
