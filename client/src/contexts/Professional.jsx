import React, { useState } from 'react';
import axios from 'axios';
const ProContext = React.createContext();

function ProProvider(props) {
  const getSingleJob = async (id) => {
    return axios.get(`http://localhost:4000/pro/job/${id}`);
  };

  return (
    <ProContext.Provider value={{ getSingleJob }}>
      {props.children}
    </ProContext.Provider>
  );
}

const usePro = () => React.useContext(ProContext);

export { ProProvider, usePro };
