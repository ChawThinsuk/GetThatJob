import { NavbarHomepage } from '../components/NavbarHome';
import { useAuth } from '../contexts/authentication';

export const HomepageProfessional = () => {
  const { state } = useAuth();
  return (
    <div className='grid grid-cols-[12%_88%] w-screen min-h-screen '>
      <NavbarHomepage userType={state.userType} />
      <div className=' bg-amber-200'>Professional</div>
    </div>
  );
};
