import { Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import AdminLoginPage from './AdminLoginPage';
import '../App.css';
import HelpButton from "../components/Support-chat/HelpButton"


function UnauthenticatedApp() {
  return (
    <div className='App flex flex-col relative'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/admin' element={<AdminLoginPage />} />
        <Route path='*' element={<LoginPage />} />
      </Routes>
      {/* <HelpButton/> */}
    </div>
  );
}

export default UnauthenticatedApp;
