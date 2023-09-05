import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/authentication';
import { HomepageProfessional } from './HomepageProfessional';
function AuthenticatedApp() {
  const { state } = useAuth();
  console.log(state);
  return (
    <div className='App'>
      <HomepageProfessional />
    </div>
  );
}

export default AuthenticatedApp;
