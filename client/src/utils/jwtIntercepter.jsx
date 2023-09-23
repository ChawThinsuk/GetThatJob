import axios from 'axios';

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      req.headers = { ...req.headers, Authorization: `Bearer: ${token}` };
    }
    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      if (
        error.response.status === 401 &&
        error.response.statusText === 'Unauthorized'
      ) {
        window.alert(error.response.data.message);
        window.localStorage.removeItem('token');
        window.location.replace('/login');
      }
      if (error.response.status === 404) {
        window.alert(error.response.data.message);
        window.location.replace('/login');
      }
      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
