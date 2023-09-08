import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios"

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user_id: null,
  });

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user_id: userDataFromToken });
      navigate("/");
    } catch (error) {
      console.log("error", error);
      setState({ ...state, error, loading: false });
    }
  };
  

  const register = async (data) => {

  };

  const logout = () => {

  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{login, state, isAuthenticated}}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };

//{userData,recruiterData}