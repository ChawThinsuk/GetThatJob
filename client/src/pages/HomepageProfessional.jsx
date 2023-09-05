import { NavbarHomepage } from '../components/NavbarHome';

export const HomepageProfessional = () => {
  return (
    <div className='grid grid-cols-[12%_88%] w-screen min-h-screen '>
      <NavbarHomepage />
      <div className=' bg-amber-200'>Home page</div>
    </div>
  );
};
