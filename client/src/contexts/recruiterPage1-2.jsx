import { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const RecruiterContext = createContext();


const RecruiterProvider = ({ children }) => {
  const navigate = useNavigate();
  const [candidateFilterState, setCandidateFilterState] = useState("all");
  const [jobPostingFilterState,setJobPostingFilterState] = useState("all")

  return <RecruiterContext.Provider value={{
    candidateFilterState,
    setCandidateFilterState,
    jobPostingFilterState,
    setJobPostingFilterState,
  }}> 
    {children}
    </RecruiterContext.Provider>;
};
const useRecruiterContext = () => {
  return useContext(RecruiterContext);
};

export { RecruiterProvider, useRecruiterContext };
