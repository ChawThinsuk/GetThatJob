import React, { useState } from 'react';
import axios from 'axios';
const ProContext = React.createContext();

function ProProvider(props) {
  const getSingleJob = async (id) => {
    return axios.get(`http://localhost:4000/pro/job/${id}`);
  };
  const dayAgo = (date) => {
    const createDate = new Date(date);
    const currentDate = new Date();
    const timeDifferent = currentDate - createDate;
    return Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
  };
  return (
    <ProContext.Provider value={{ getSingleJob, dayAgo }}>
      {props.children}
    </ProContext.Provider>
  );
}

const usePro = () => React.useContext(ProContext);

export { ProProvider, usePro };
