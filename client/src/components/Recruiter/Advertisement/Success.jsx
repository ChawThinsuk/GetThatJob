import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import success from '../../../assets/pro2/success.svg';
import { AiFillHeart } from 'react-icons/ai';

function Success() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <section className='flex flex-col items-center w-[35%] h-[70%] bg-gray-100 rounded-lg border-[1px] border-gray-200 shadow-lg p-8'>
        <img src={success} alt='' className='w-[100px] h-[100px]' />
        <p className='mt-3 text-[40px] font-[Inter] font-bold text-gray-600'>
          Payment success
        </p>
        <p className='mt-3 text-center  font-[Inter] font-bold text-[35px] text-emerald-600'>
          THB 300.00
        </p>
        <p className='mt-8 font-[Inter] text-[15px] w-full text-center border-b-2 border-gray-300 pb-4'>
          Receipt has been sent to test@gmail.com
        </p>
        <h1 className='mt-3 font-bold text-[30px] text-red-400'>
          Thanks you for supporting us.
        </h1>
        <AiFillHeart className='mt-3 text-red-400 w-[80px] h-[80px]' />
      </section>
      <div>
        <Link to='/'>
          <button
            type='button'
            className='mt-5 bg-[#f6a6c1] hover:bg-[#fa93b5] rounded-xl w-[200px] h-[50px] font-[Inter] text-[18px] font-semibold text-white'
          >
            Back to home page
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Success;
