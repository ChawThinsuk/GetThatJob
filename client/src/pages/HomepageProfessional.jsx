import { NavbarHomepage } from '../components/NavbarHome';
import { useAuth } from '../contexts/Authorization';
import { Routes, Route } from 'react-router-dom';
import { FindThatJob } from '../components/Professional/FindThatJob';
import { Following } from '../components/Professional/Following';
import { ProfessionalProfile } from '../components/Professional/ProfessionalProfile';
import { YourApplication } from '../components/Professional/YourApplication';

export const HomepageProfessional = () => {
  const { state } = useAuth();
  return (
    <div className='grid grid-cols-[15%_85%] w-screen min-h-screen '>
      <NavbarHomepage userType={state.userType} />
      <Routes>
        <Route path='/' element={<FindThatJob />} />
        <Route path='/follow' element={<Following />} />
        <Route path='/proprofile' element={<ProfessionalProfile />} />
        <Route path='/apply' element={<YourApplication />} />
        <Route path='*' element={<FindThatJob />} />
      </Routes>
    </div>
  );
};
