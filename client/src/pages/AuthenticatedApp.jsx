import { useAuth } from '../contexts/Authorization';
import { HomepageProfessional } from './HomepageProfessional';
import { HomepageRecruiter } from './HomepageRecruiter';
function AuthenticatedApp() {
  const { state } = useAuth();
  console.log(state);
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
