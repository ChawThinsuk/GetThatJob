import { NavbarHomepage } from '../components/NavbarHome';
import { useAuth } from '../contexts/authentication';
export const HomepageRecruiter = () => {
  const { state } = useAuth();
  return (
    <div className='grid grid-cols-[12%_88%] w-screen min-h-screen '>
      <NavbarHomepage />
      <div className=' bg-amber-200'>Recruiter</div>
    </div>
  );
};
