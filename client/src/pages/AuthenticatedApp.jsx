import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/authentication';
import { HomepageProfessional } from './HomepageProfessional';
import { HomepageRecruiter } from './HomepageRecruiter';
function AuthenticatedApp() {
  const { state } = useAuth();
  return (
    <div className='App'>
      {state.userType === 'PROFESSIONAL' ? (
        <HomepageProfessional />
      ) : (
        <HomepageRecruiter />
      )}
    </div>
  );
}

export default AuthenticatedApp;
