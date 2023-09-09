import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const AuthContext = React.createContext();
const getState = () => {
  const data = JSON.parse(localStorage.getItem('state'));
  return data;
};

function AuthProvider(props) {
  const [state, setState] = useState(getState());



  const login = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/auth/login',
        data
      );
      const token = response.data.token;
      localStorage.setItem('token', token);
      const userDataFromToken = jwtDecode(token);
      localStorage.setItem('state', JSON.stringify(userDataFromToken));
      setState(getState());
    } catch (error) {
      console.log('error', error);
      setState({ ...state, error, loading: false });
    }
  };

  const register = async (data) => {};

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('state');
    setState({ ...state, id: null, userType: null });

  };

  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <AuthContext.Provider value={{ state, login, logout, isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };

//{userData,recruiterData}