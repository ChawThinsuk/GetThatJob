import { NavbarHomepage } from '../components/NavbarHome';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/Authorization';
import { CreateNewJob } from '../components/Recruiter/CreateNewJob';
import  JobPosting  from '../components/Recruiter/JobPosting';
import { RecruiterProfile } from '../components/Recruiter/RecruiterProfile';
import ShowJobPosting  from '../components/Recruiter/ShowJobPosting';
export const HomepageRecruiter = () => {
  const { state } = useAuth();
  return (
    <div className='grid grid-cols-[15%_85%] w-screen min-h-screen '>
      <NavbarHomepage userType={state.userType} />
      <Routes>
        <Route path='/' element={<JobPosting />}/>
        <Route path='/show' element={<ShowJobPosting  id={state.userID}/>} />
        <Route path='/createjob' element={<CreateNewJob />} />
        <Route path='/recruitprofile' element={<RecruiterProfile />} />
        <Route path='*' element={<JobPosting />} />
      </Routes>
    </div>
  );
};
