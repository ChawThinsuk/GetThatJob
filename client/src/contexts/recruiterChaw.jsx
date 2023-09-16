import { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/Authorization';


const recruiterContext = createContext();
const { state } = useAuth();

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState([]);
  const getPost = async () => {
    try {
      const data = {
        job_user_mark: "all",
        job_id: 2,
      };
      const response = await axios.post(
        "http://localhost:4000/chaw/getcandidate",
        data
      );
      console.log(response);
      setCandidate(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  return <recruiterContext.Provider>{children}</recruiterContext.Provider>;
};
const useGlobalContext = () => {
  return useContext(recruiterContext);
};

export { ContextProvider, useGlobalContext };
