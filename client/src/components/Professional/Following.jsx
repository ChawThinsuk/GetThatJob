import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Authorization';
import JobCard from './JobCard';
import axios from 'axios';

export const Following = () => {
  const [followedJobs, setFollowedJobs] = useState([]);
  const { state } = useAuth();

  const getFollowedJobs = async (userID) => {
    const followedJobFetched = await axios.get(
      'http://localhost:4000/pro/followedJobs',
      {
        params: { userID: userID },
      }
    );
    const followedJobData = followedJobFetched.data.data;
    setFollowedJobs(followedJobData);
  };
  useEffect(() => {
    getFollowedJobs(state.userID);
  }, []);

  return (
    <div className='flex flex-col justify-start gap-[21.3334px] w-full min-h-srceen pr-[100px] pl-[100px] pt-[50px] font-[Inter] bg-[#F5F5F6]'>
      <h1 className='font-[Montserrat] font-[400] text-[45.3356px] '>
        Following
      </h1>
      <div className='flex flex-col gap-[10.6667px] p-[10.6672] w-full min-h-screen'>
        <p className='font-[Montserrat] font-[500] text-[26.668px]'>
          You are following {followedJobs.length} jobs
        </p>
        <div className='flex flex-wrap justify-start gap-[16px] w-[1280px] h-srceen'>
          {followedJobs.map((job) => {
            return <JobCard job={job} key={job.job_id} />;
          })}
        </div>
      </div>
    </div>
  );
};
