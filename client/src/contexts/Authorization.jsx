import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const AuthContext = React.createContext();
// set state to localstorage
const getState = () => {
  const data = JSON.parse(localStorage.getItem('state'));
  return data;
};

function AuthProvider(props) {
  const [state, setState] = useState(getState());
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:4000/auth/login',
        data
      );
      setLoading(false);
      const token = response.data.token;
      const userDataFromToken = jwtDecode(token);
      //Save token and data in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('state', JSON.stringify(userDataFromToken));
      setState(getState());
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('state');
    setState({ ...state, userID: null, userType: null });
  };

  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, isAuthenticated, loading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
