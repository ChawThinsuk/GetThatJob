import { useAuth } from '../contexts/Authorization';
import icon from '../assets/gtj-logo 1.svg';
import search from '../assets/NavbarHome/search.svg';
import paper from '../assets/NavbarHome/paper.svg';
import follow from '../assets/NavbarHome/follow.svg';
import user from '../assets/NavbarHome/profile.svg';
import bag from '../assets/NavbarHome/bag.svg';
import doc from '../assets/NavbarHome/doc.svg';
import logoutlogo from '../assets/NavbarHome/logout.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const NavbarHomepage = () => {
  const navigate = useNavigate();
  const [selectNav, setSelectNav] = useState('/');
  const { logout, state } = useAuth();
  const professionalNav = [
    { logo: search, title: 'Find that job', url: '/' },
    { logo: paper, title: 'Your application', url: '/apply' },
    { logo: follow, title: 'Following', url: '/follow' },
    { logo: user, title: 'profile', url: '/proprofile' },
  ];
  const recruiterNav = [
    { logo: bag, title: 'Job Postings', url: '/' },
    { logo: doc, title: 'Create New Job', url: '/createjob' },
    { logo: user, title: 'profile', url: '/recruitprofile' },
  ];

  return (
    <div className='bg-[#E1E2E1]'>
      <div id='logo' className='flex items-center pt-[36px] pl-[24px]'>
        <img className='object-contain ' src={icon} alt='logos' />
      </div>
      <div className='pt-4'>
        {(state.userType === 'PROFESSIONAL'
          ? professionalNav
          : recruiterNav
        ).map((navButton) => {
          return (
            <Link
              key={navButton.title}
              to={navButton.url}
              onClick={() => setSelectNav(navButton.url)}
            >
              <div
                className={`flex flex-rows justify-start items-center w-full h-[48px] p-4 ${
                  navButton.url === selectNav && 'bg-[#f5f5f6]'
                }`}
              >
                <img src={navButton.logo} className='p-2' />
                <p className=' text-[16px]'>{navButton.title}</p>
              </div>
            </Link>
          );
        })}
        <div
          className='flex flex-rows justify-start items-center w-full h-[48px] p-4 hover:cursor-pointer'
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          <img src={logoutlogo} className='p-2' />
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
};
