import axios from "axios";
import React, { useState } from "react";

const ProContext = React.createContext();

function ProProvider(props) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jobFollow, setJobFollow] = useState(null);
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
    const { searchTerm, category, type } = input;
    try {
      const params = new URLSearchParams();
      params.append("searchTerm", searchTerm);
      params.append("category", category);
      params.append("type", type);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:4000/big?${params.toString()}`
      );
      setJobs(result.data.data.rows);
      console.log(input);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
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
      await axios.post(`http://localhost:4000/pro/jobpro`, { data });
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
      }}
    >
      {props.children}
    </ProContext.Provider>
  );
}
const usePro = () => React.useContext(ProContext);

export { ProProvider, usePro };
