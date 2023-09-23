import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AuthContext = React.createContext();
// set state to localstorage
const getState = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const userDataFromToken = jwtDecode(token);
    return userDataFromToken;
  }
};

function AuthProvider(props) {
  const navigate = useNavigate();
  const [state, setState] = useState(getState());
  const [loading, setLoading] = useState(false);
  const [loginResult, setLoginResult] = useState(null);

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:4000/auth/login',
        data
      );
      const token = response.data.token;
      if (token) {
        //Save token and data in local storage
        localStorage.setItem('token', token);
        setState(getState());
        setLoading(false);
        navigate('/');
      } else {
        setLoginResult(response.data.status);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setLoginResult(500);
      console.log('error', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({ ...state, userID: null, userType: null });
  };

  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        isAuthenticated,
        loading,
        loginResult,
        setLoginResult,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
