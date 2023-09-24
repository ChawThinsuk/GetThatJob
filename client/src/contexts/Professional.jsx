import axios from 'axios';
import React, { useState } from 'react';

const ProContext = React.createContext();

function ProProvider(props) {
  //---------------------------------------------------State--------------------------------------------------
  const [jobs, setJobs] = useState([]);
  const [jobFollow, setJobFollow] = useState(null);
  const [popularJobs, setPopularJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //----------------------------------------------------Utility----------------------------------------------
  const dayAgo = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = (currentDate - date) / 1000; // Convert to seconds
    const oneMinuteInSeconds = 60;
    const oneHourInSeconds = 60 * 60;
    if (timeDifference < oneMinuteInSeconds) {
      const secondsAgo = Math.floor(timeDifference);
      return `${secondsAgo} second${secondsAgo === 1 ? '' : 's'} ago`;
    } else if (timeDifference < oneHourInSeconds) {
      const minutesAgo = Math.floor(timeDifference / oneMinuteInSeconds);
      return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    } else if (timeDifference < oneHourInSeconds * 24) {
      const hoursAgo = Math.floor(timeDifference / oneHourInSeconds);
      return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
    } else if (timeDifference < oneHourInSeconds * 24 * 5) {
      const daysAgo = Math.floor(timeDifference / (oneHourInSeconds * 24));
      return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
    }
  };
  //----------------------------------------------------Axios-------------------------------------------------
  //Pro1
  const getJobs = async (input) => {
    const { searchTerm, category, type, minSalary, maxSalary, location } =
      input;
    try {
      const params = new URLSearchParams();
      params.append('searchTerm', searchTerm);
      params.append('category', category);
      params.append('type', type);
      params.append('minSalary', minSalary);
      params.append('maxSalary', maxSalary);
      params.append('location', location);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:4000/big?${params.toString()}`
      );
      setJobs(result.data.data.rows);
      console.log(input);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  const getPopularJob = async () => {
    try {
      const popularJob = await axios.get(
        `http://localhost:4000/big/job/popular`
      );
      let popularSearch = [];
      popularJob.data.popularJobs.map((job) => {
        for (let i in job) {
          if (!popularSearch.includes(job[i])) {
            popularSearch.push(job[i]);
          }
        }
      });
      setPopularJobs(popularSearch);
    } catch (error) {
      console.log(error);
    }
  };
  //Pro2
  const getSingleJob = async (id) => {
    return axios.get(`http://localhost:4000/pro/job/${id}`);
  };
  //JobHeader,JobCard
  const getJobFollowStatus = async (userID, job_id) => {
    try {
      const jobFollowStatus = await axios.get(
        `http://localhost:4000/pro/follow/job`,
        {
          params: { userID: userID, job_id: job_id },
        }
      );
      setJobFollow(jobFollowStatus.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateJobFollowStatus = async (data) => {
    // data need 2 keys job_professional_id and job_professional_follow
    try {
      axios.put(`http://localhost:4000/pro/follow/job`, { data });
    } catch (error) {
      console.log(error);
    }
  };
  const addJobProfessionalData = async (data) => {
    try {
      await axios.post(`http://localhost:4000/pro/follow/job`, { data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProContext.Provider
      value={{
        jobs,
        setJobs,
        getJobs,
        isLoading,
        getSingleJob,
        dayAgo,
        getJobFollowStatus,
        jobFollow,
        setJobFollow,
        updateJobFollowStatus,
        addJobProfessionalData,
        getPopularJob,
        popularJobs,
      }}
    >
      {props.children}
    </ProContext.Provider>
  );
}
const usePro = () => React.useContext(ProContext);

export { ProProvider, usePro };
