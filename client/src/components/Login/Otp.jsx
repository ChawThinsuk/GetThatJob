import { Button, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
export const Otp = ({ props }) => {
  const { setEmail, email, setPage } = props;
  const [otp, setOtp] = useState(null);
  const [inputOtp, setInputOtp] = useState([0, 0, 0, 0, 0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const toast = useToast();

  const handleEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const OTP = Math.floor(Math.random() * 900000 + 100000);
      await axios.post('http://localhost:3000/email', {
        recipient_email: email,
        OTP,
      });
      toast({
        title: 'OTP has been sended to yout email.',
        description: 'Please check yout email.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setOtp(OTP);
      setIsLoading(false);
      setStep(2);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Something wrong.',
        description: 'Please try again later.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp == inputOtp.join('')) {
      setPage('changePass');
    } else {
      toast({
        title: 'Wrong OTP.',
        description: 'Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <div className='flex mt-24 justify-center w-screen h-screen'>
      <section className='w-[35%] h-fit pt-[20px] px-[20px] pb-[50px] bg-gray-100 border-[0.5px] border-gray-300 rounded-lg shadow-xl transition-all duration-500'>
        <div className='flex flex-col items-end pt-3'>
          <h1 className='font-[Montserrat] text-[18px]  w-full'>
            Please input your email address
          </h1>
          <input
            type='text'
            value={email}
            className='mt-2 text-[19px] w-full h-[40px] rounded-lg border-[1px] border-gray-300 pl-5 bg-gray-100 shadow-sm focus:outline-none focus:bg-white'
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {isLoading ? (
            <Button
              isLoading
              mt={3}
              loadingText='Loading'
              colorScheme='teal'
              variant='outline'
              spinnerPlacement='start'
            ></Button>
          ) : step === 2 ? (
            <Button
              isDisabled
              type='button'
              bg={'gray.300'}
              mt={3}
              fontSize='md'
              textColor='white'
              onClick={handleEmail}
            >
              OTP sended
            </Button>
          ) : (
            <Button
              type='button'
              bg='#F48FB1'
              mt={3}
              fontSize='md'
              textColor='white'
              onClick={handleEmail}
            >
              Send OTP
            </Button>
          )}
        </div>

        {/*------------------------------------------------step2-------------------------------------- */}
        {step === 2 && (
          <div className='flex flex-col w-full items-center pt-3 mt-8 transition-all duration-500'>
            <h1 className='font-[Montserrat] text-[35px] font-bold'>
              Email Verification
            </h1>
            <p className='font-[Inter] text-gray-500'>
              We have sent a code to your email {email}
            </p>
            <div className='flex justify-center mt-8 w-full gap-[10px]'>
              <input
                maxLength={1}
                className=' text-center w-[50px] h-[60px] bg-gray-200 rounded-lg text-[35px] border-[1.5px] border-gray-400 shadow-md focus:outline-none'
                onChange={(e) =>
                  setInputOtp([
                    e.target.value,
                    inputOtp[1],
                    inputOtp[2],
                    inputOtp[3],
                    inputOtp[4],
                    inputOtp[5],
                  ])
                }
              />
              <input
                maxLength={1}
                className=' text-center w-[50px] h-[60px] bg-gray-200 rounded-lg text-[35px] border-[1.5px] border-gray-400 shadow-md focus:outline-none'
                onChange={(e) =>
                  setInputOtp([
                    inputOtp[0],
                    e.target.value,
                    inputOtp[2],
                    inputOtp[3],
                    inputOtp[4],
                    inputOtp[5],
                  ])
                }
              />
              <input
                maxLength={1}
                className=' text-center w-[50px] h-[60px] bg-gray-200 rounded-lg text-[35px] border-[1.5px] border-gray-400 shadow-md focus:outline-none'
                onChange={(e) =>
                  setInputOtp([
                    inputOtp[0],
                    inputOtp[1],
                    e.target.value,
                    inputOtp[3],
                    inputOtp[4],
                    inputOtp[5],
                  ])
                }
              />
              <input
                maxLength={1}
                className=' text-center w-[50px] h-[60px] bg-gray-200 rounded-lg text-[35px] border-[1.5px] border-gray-400 shadow-md focus:outline-none'
                onChange={(e) =>
                  setInputOtp([
                    inputOtp[0],
                    inputOtp[1],
                    inputOtp[2],
                    e.target.value,
                    inputOtp[4],
                    inputOtp[5],
                  ])
                }
              />
              <input
                maxLength={1}
                className=' text-center w-[50px] h-[60px] bg-gray-200 rounded-lg text-[35px] border-[1.5px] border-gray-400 shadow-md focus:outline-none'
                onChange={(e) =>
                  setInputOtp([
                    inputOtp[0],
                    inputOtp[1],
                    inputOtp[2],
                    inputOtp[3],
                    e.target.value,
                    inputOtp[5],
                  ])
                }
              />
              <input
                maxLength={1}
                className=' text-center w-[50px] h-[60px] bg-gray-200 rounded-lg text-[35px] border-[1.5px] border-gray-400 shadow-md focus:outline-none'
                onChange={(e) =>
                  setInputOtp([
                    inputOtp[0],
                    inputOtp[1],
                    inputOtp[2],
                    inputOtp[3],
                    inputOtp[4],
                    e.target.value,
                  ])
                }
              />
            </div>
            <button
              className='w-3/4 h-[50px] mt-10 bg-[#F48FB1] text-[18px] text-white font-semibold rounded-lg shadow-lg hover:cursor-pointer hover:bg-[#eb6c96]'
              onClick={handleSubmit}
            >
              Submit
            </button>
            <div className='flex gap-2 mt-5'>
              <p>Didn't receive email?</p>
              <p
                className=' text-blue-900 underline hover:cursor-pointer'
                onClick={handleEmail}
              >
                resend email
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
