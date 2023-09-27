import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import axios from 'axios';

function Cancel() {
  const [isLoading, setIsloading] = useState(false);
  const getSession = async () => {
    setIsloading(true);
    try {
      const urlParams = new URLSearchParams(window.location.search).get(
        'job_id'
      );
      const paymentStatus = await axios(
        `http://localhost:4000/ads/success/jobs/${urlParams}`
      );
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getSession();
  }, []);
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      {isLoading ? (
        <div className='w-full h-fill flex justify-center items-center'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='#F48FB1'
            size='xl'
          />
        </div>
      ) : (
        <>
          <section className='flex flex-col items-center w-[40%]  bg-gray-100 rounded-lg border-[1px] border-gray-200 shadow-lg p-8'>
            <BsFillExclamationCircleFill className='w-[100px] h-[100px] text-amber-400' />
            <p className='mt-8 text-[40px] font-[Inter] font-bold text-gray-600'>
              Payment Canceled
            </p>

            <p className='mt-5 font-[Inter] text-[20px] w-full text-center border-b-2 border-gray-300 pb-4'>
              Your transaction has been canceled.
            </p>
            <div className='flex gap-5'>
              <Link to='/'>
                <button
                  type='button'
                  className='mt-5 bg-[#f6a6c1] hover:bg-[#fa93b5] rounded-xl w-[200px] h-[50px] font-[Inter] text-[18px] font-semibold text-white'
                >
                  Back to home page
                </button>
              </Link>
              <Link to='/ads'>
                <button
                  type='button'
                  className='mt-5 bg-[#f6a6c1] hover:bg-[#fa93b5] rounded-xl min-w-[200px] pr-2 pl-2 h-[50px] font-[Inter] text-[18px] font-semibold text-white'
                >
                  Back to Advertisement page
                </button>
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Cancel;
