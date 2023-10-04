import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import success from '../../../assets/pro2/success.svg';
import { AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
function Success() {
  const [isLoading, setIsloading] = useState(false);
  const [transaction, setTransaction] = useState('');
  const getSession = async () => {
    setIsloading(true);
    try {
      const urlParams = new URLSearchParams(window.location.search).get(
        'job_id'
      );
      const paymentStatus = await axios(
        `https://gtj-server.onrender.com/ads/success/jobs/${urlParams}`
      );
      setTransaction(paymentStatus.data.data);
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
          <section className='flex flex-col items-center w-[500px]  bg-gray-100 rounded-lg border-[1px] border-gray-200 shadow-lg p-8'>
            <img src={success} alt='' className='w-[100px] h-[100px]' />
            <p className='mt-3 text-[40px] font-[Inter] font-bold text-gray-600'>
              Payment success
            </p>
            {transaction && (
              <p className='mt-3 text-center  font-[Inter] font-bold text-[35px] text-emerald-600'>
                THB {transaction.amount.toFixed(2)}
              </p>
            )}
            <p className='mt-8 font-[Inter] text-[15px] w-full text-center border-b-2 border-gray-300 pb-4'>
              Receipt has been sent to {transaction.email}
            </p>
            <h1 className='mt-3 font-bold text-[30px] text-red-400'>
              Thanks you for supporting us.
            </h1>
            <AiFillHeart className='mt-3 text-red-400 w-[80px] h-[80px]' />
          </section>
          <div>
            <a href='/history'>
              <button
                type='button'
                className='mt-5 bg-[#f6a6c1] hover:bg-[#fa93b5] rounded-xl w-[350px] h-[50px] font-[Inter] text-[18px] font-semibold text-white'
              >
                Go to Payment history page
              </button>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
export default Success;
