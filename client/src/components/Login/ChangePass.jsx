import axios from 'axios';
import { useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';

const ChangePass = ({ email, setPage }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const changePassword = async () => {
    setIsLoading(true);
    if (newPassword.length === 0) {
      toast({
        title: 'Password field empty.',
        description: 'Please input new password.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    if (newPassword.length < 4) {
      toast({
        title: 'Unsafe password.',
        description: 'Please input atleast 4 characters.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    if (newPassword === confirmPassword) {
      try {
        await axios.put('http://localhost:4000/auth/password', {
          newPassword,
          email,
        });
        setIsLoading(false);
        setPage('recovered');
      } catch (error) {
        setIsLoading(false);
        toast({
          title: 'Something wrong.',
          description: 'Please try again later.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        console.log(error);
      }
    } else {
      setIsLoading(false);
      toast({
        title: "Passwords don't match.",
        description: 'Please check your password field.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div className='flex mt-24 justify-center w-screen h-screen font-[Inter]'>
      <section className='w-[35%] h-fit flex flex-col justify-center items-center pt-[20px] pb-[40px] bg-gray-100 border-[0.5px] border-gray-300 rounded-lg shadow-xl transition-all duration-500'>
        <div className='w-[70%]'>
          <form>
            <p className='text-[24px] font-semibold pt-4'>Change Password</p>
            <label>
              <p className='text-[16px] pt-5'>New Password</p>
              <input
                type='password'
                placeholder='******'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='border-[1px] border-[#F48FB1] rounded-[8px] w-full h-[36px] flex flex-col justify-center text-[14px] p-[8px] mt-2 focus:outline-none'
              ></input>
              <p className='text-[16px] pt-3'>Confrim Password</p>
              <input
                type='password'
                placeholder='******'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='border-[1px] border-[#F48FB1] rounded-[8px] w-full h-[36px] flex flex-col justify-center text-[14px] p-[8px] mt-2 focus:outline-none'
              ></input>
            </label>
          </form>
          <div className='flex flex-row justify-end pt-2'>
            {isLoading ? (
              <Button
                isLoading
                mt={2}
                loadingText='Loading'
                colorScheme='teal'
                variant='outline'
                spinnerPlacement='start'
              ></Button>
            ) : (
              <Button
                type='button'
                bg='#F48FB1'
                mt={2}
                fontSize='md'
                textColor='white'
                onClick={changePassword}
              >
                Send OTP
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ChangePass;
