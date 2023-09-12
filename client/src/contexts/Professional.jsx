import React, { useState } from "react";
import axios from "axios";
const ProContext = React.createContext();

function ProProvider(props) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getSingleJob = async (id) => {
    return axios.get(`http://localhost:4000/pro/job/${id}`);
  };
  const getJobs = async ({ category }) => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:4000/big?test=${category}&id=1`
      );
      setJobs(result.data.data.rows);
      console.log(result.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ProContext.Provider
      value={{ jobs, setJobs, getJobs, isLoading, getSingleJob }}
    >
      {props.children}
    </ProContext.Provider>
  );
}

const usePro = () => React.useContext(ProContext);

export { ProProvider, usePro };
