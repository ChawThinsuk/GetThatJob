import success from '../../assets/success.svg';
import { useEffect } from 'react';

export const ResetSuccess = ({ setPage }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage('login');
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className='flex mt-[10%] justify-center w-screen h-screen'>
      <section className='flex flex-col items-center w-[35%] h-fit pt-[20px] px-[20px] pb-[10px] bg-gray-100 border-[0.5px] border-gray-300 rounded-lg shadow-xl transition-all duration-500'>
        <img src={success} />
        <h1 className='font-[Inter] font-[600] text-[25px] mt-3 text-gray-600'>
          Reset password complete
        </h1>
        <p className='mt-5 text-[14px] text-gray-800'>
          Redirecting to login page..
        </p>
      </section>
    </div>
  );
};
