import { NavbarHomepage } from '../components/NavbarHome';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/authentication';
import { CreateNewJob } from '../components/Recruiter/CreateNewJob';
import { JobPosting } from '../components/Recruiter/JobPosting';
import { RecruiterProfile } from '../components/Recruiter/RecruiterProfile';
export const HomepageRecruiter = () => {
  const { state } = useAuth();
  return (
    <div className='grid grid-cols-[12%_88%] w-screen min-h-screen '>
      <NavbarHomepage userType={state.userType} />
      <Routes>
        <Route path='/' element={<JobPosting />} />
        <Route path='/createjob' element={<CreateNewJob />} />
        <Route path='/recruitprofile' element={<RecruiterProfile />} />
        <Route path='*' element={<JobPosting />} />
      </Routes>
    </div>
  );
};
