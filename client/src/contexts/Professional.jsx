import axios from 'axios';
import React, { useState } from 'react';

const ProContext = React.createContext();

function ProProvider(props) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jobFollow, setJobFollow] = useState(null);
  const [popularJobs, setPopularJobs] = useState([]);
  const getSingleJob = async (id) => {
    return axios.get(`http://localhost:4000/pro/job/${id}`);
  };
  const dayAgo = (date) => {
    const createDate = new Date(date);
    const currentDate = new Date();
    const timeDifferent = currentDate - createDate;
    return Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
  };
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
      await axios.post(`http://localhost:4000/pro/jobpro/follow`, { data });
    } catch (error) {
      console.log(error);
    }
  };
  const getPopularJob = async () => {
    try {
      const popularJob = await axios.get(
        `http://localhost:4000/big/job/popular`
      );
      setPopularJobs(popularJob.data.popularJobs);
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
