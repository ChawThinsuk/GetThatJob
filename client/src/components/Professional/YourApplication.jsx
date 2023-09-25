import { JobHeader } from './JobHeader';
import { Textarea } from '@chakra-ui/react';
import { Text, Box, useToast } from '@chakra-ui/react';
import {
  Radio,
  RadioGroup,
  Stack,
  Button,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { EmailIcon } from '@chakra-ui/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { usePro } from '../../contexts/Professional';
import Axios from 'axios';
import { useAuth } from '../../contexts/Authorization';
import axios from 'axios';
import leftArrow from '../../assets/pro2/leftArrow.svg';
import { Link } from 'react-router-dom';

export const YourApplication = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const [cvChosen, setCvChosen] = useState(false);
  const [cvFileName, setCvFileName] = useState('No file chosen');
  const { job_id } = useParams();
  const { getSingleJob } = usePro();
  const [experienceData, setExperienceData] = useState('');
  const [cvData, setCvData] = useState('You did not uploaded your CV');
  const { state } = useAuth();
  const [interestingData, setInterestingData] = useState('');
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const submitProfileData = {
        job_user_cv: cvData,
        job_user_experience: experienceData,
        job_user_interesting: interestingData,
      };

      await axios.put(
        `http://localhost:4000/pro/users/${state.userID}/jobs/${job_id}`,
        submitProfileData
      );

      toast({
        title: 'Profile submitted successfully',
        status: 'success',
        duration: 2000,
        isCloseable: true,
      });
      navigate('/apply');
    } catch (error) {
      console.error('Error submit profile');
      toast({
        title: 'An error occured while submit your profile, Please try again',
        status: 'error',
        duration: 2000,
        isCloseable: true,
      });
    }
  };

  useEffect(() => {
    const apiUrl = `http://localhost:4000/pro/users/${state.userID}`;

    Axios.get(apiUrl)
      .then((res) => {
        const { experience } = res.data.data;
        const { cv } = res.data.data;
        console.log(res.data.data);
        setExperienceData(experience);
        setCvData(cv);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const { data, isLoading, error } = useQuery(['job', job_id], () =>
    getSingleJob(job_id)
  );
  console.log(experienceData);
  if (isLoading) {
    return (
      <div className='w-screen h-screen opacity-80 bg-white flex justify-center items-center'>
        <Spinner
          thickness='4px'
          speed='0.5s'
          emptyColor='gray.200'
          color='#F48FB1'
          size='xl'
        />
      </div>
    );
  }
  if (error) {
    return (
      <div className='absolute w-screen h-screen flex flex-col items-center pt-20'>
        <h1 className='text-[3.1rem] font-bold text-[#373737] '>
          Something wrong
        </h1>
        <div className='flex mt-5 gap-10'>
          <Link to='/'>
            <h1 className=' text-blue-700 text-[1.3rem] underline hover:cursor-pointer hover:text-blue-800'>
              Back to homepage
            </h1>
          </Link>
          <h1
            className=' text-blue-700 text-[1.3rem] underline hover:cursor-pointer hover:text-blue-800'
            onClick={() => window.location.reload(true)}
          >
            Retry
          </h1>
        </div>
      </div>
    );
  }
  if (!data.data.job) {
    return (
      <div className='absolute w-screen h-screen flex flex-col items-center pt-20'>
        <h1 className='text-[3.1rem] font-bold text-[#373737] '>
          JOB NOT FOUNDED
        </h1>
        <div className='flex mt-5 gap-10'>
          <Link to='/'>
            <h1 className=' text-blue-700 text-[1.3rem] underline hover:cursor-pointer hover:text-blue-800'>
              Back to homepage
            </h1>
          </Link>
          <h1
            className=' text-blue-700 text-[1.3rem] underline hover:cursor-pointer hover:text-blue-800'
            onClick={() => window.location.reload(true)}
          >
            Retry
          </h1>
        </div>
      </div>
    );
  }
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setCvFileName(selectedFile.name);
      setCvChosen(true);
    } else {
      setCvFileName('No file chosen');

      setCvChosen(false);
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap='0.5rem'
      width='full'
      minH='100vh'
      backgroundColor='#F5F5F6'
      paddingTop='2rem'
      paddingLeft='10%'
      paddingRight='10%'
      paddingBottom='53.336px'
    >
      <Link to={`/${job_id}`}>
        <button className='flex items-center h-[32.001px] pb-0'>
          <img src={leftArrow} className='w-[32.001px] h-[32.001px]' />
          <p className=' font-[Inter] text-[18.667px] text-[#616161]'>BACK</p>
        </button>
      </Link>
      <div className=' mb-[3.05rem]'>
        <JobHeader
          data={data.data.job}
          state={{ cvData, experienceData, interestingData }}
        />
      </div>
      <Box
        display='flex'
        flexDirection='column'
        gap='1.1rem'
        width='60.1rem'
        alignItems='flex-start'
      >
        <Text className='text-[32.001px] text-[#BF5F82] font-[400] font-[Montserrat]'>
          Complete your application
        </Text>
        <Box
          display='flex'
          flexDirection='column'
          gap='0.35rem'
          alignItems='flex-start'
        >
          <Text className='w-[1013.384px] text-[21.334px] text-[#373737] font-[400] font-[Inter] leading-[32.001px] tracking-[0.668px]'>
            SEND YOUR CV UPDATED
          </Text>
          {/* ... */}
          <RadioGroup
            onChange={setValue}
            value={value}
            fontFamily='Inter'
            fontSize='1.7rem'
            fontStyle='normal'
            fontWeight='400'
            lineHeight='1.25rem'
            letterSpacing='0.01563rem'
            color='#616161'
            colorScheme='customRadio1'
          >
            <Stack direction='row'>
              <Radio value='1'>Use current CV</Radio>
              <Radio value='2'>Upload new CV</Radio>
            </Stack>
          </RadioGroup>
          {/* ... */}
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          gap='0.35rem'
          alignItems='flex-start'
        >
          <Flex
            alignItems='center'
            gap='0.683rem'
            fontFamily='Inter'
            fontSize='0.955rem'
            fontStyle='normal'
            fontWeight='400'
            lineHeight='1.35rem'
            letterSpacing='0.1rem'
          >
            <Button
              bg='#F48FB1'
              textColor='white'
              _hover={{ bg: '#de7b9c' }}
              onClick={() => document.getElementById('cvInput').click()}
              isDisabled={value === '1'}
              color='white'
              padding='1.5rem'
              fontFamily='Inter'
              fontSize='1.6rem'
              fontStyle='normal'
              fontWeight='500'
              lineHeight='1.6rem'
              letterSpacing='0.05rem'
              textTransform='uppercase'
              borderRadius='10px'
            >
              Choose a File
            </Button>
            {value === '1' ? (
              <Text color='#616161'>
                {cvData ? cvData : 'You did not uploaded your CV'}
              </Text>
            ) : (
              <Text color='#616161'>
                {cvChosen ? cvFileName : 'No file chosen'}
              </Text>
            )}
          </Flex>
          <input
            type='file'
            style={{ display: 'none' }}
            id='cvInput'
            accept='.pdf'
            onChange={handleFileChange}
          />
          <Text
            fontFamily='Inter'
            fontSize='1rem'
            fontStyle='normal'
            fontWeight='400'
            lineHeight='1.3rem'
            letterSpacing='0.1rem'
            color='#8E8E8E'
          >
            Only PDF. Max size 5MB
          </Text>
        </Box>
        <Box display='flex' flexDirection='column' width='47.7rem' gap='0.4rem'>
          <Text
            fontFamily='Inter'
            fontSize='0.7rem'
            fontStyle='normal'
            fontWeight='400'
            lineHeight='normal'
            letterSpacing='0.05rem'
            textTransform='uppercase'
            color='#373737'
          >
            Professional experience (taken from your profile)
          </Text>
          <Textarea
            placeholder='Professional experience'
            border='2px'
            borderColor='#F48FB1'
            display='flex'
            alignItems='flex-start'
            padding='0.6rem'
            alignSelf='stretch'
            fontFamily='Inter'
            fontSize='0.725rem'
            fontStyle='normal'
            fontWeight='400'
            lineHeight='1.35rem'
            letterSpacing='0.05rem'
            textTransform='uppercase'
            color='#373737'
            height='30rem'
            width='60rem'
            value={experienceData}
            onChange={(e) => setExperienceData(e.target.value)}
          />
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          width='47.5rem'
          gap='0.25rem'
        >
          <Text
            fontFamily='Inter'
            fontSize='0.7rem'
            fontStyle='normal'
            fontWeight='400'
            lineHeight='normal'
            letterSpacing='0.05rem'
            textTransform='uppercase'
            color='#373737'
          >
            Why are you interested in working at {job_id}
          </Text>
          <Textarea
            placeholder='Mention things about The Company Name SA that excite you. Why would you be a good candidate?'
            border='2px'
            borderColor='#F48FB1'
            display='flex'
            alignItems='flex-start'
            padding='0.6rem'
            alignSelf='stretch'
            fontFamily='Inter'
            fontSize='0.725rem'
            fontStyle='normal'
            fontWeight='400'
            lineHeight='1.35rem'
            letterSpacing='0.05rem'
            textTransform='uppercase'
            color='#373737'
            height='25rem'
            width='60rem'
            value={interestingData}
            onChange={(e) => setInterestingData(e.target.value)}
          />
          <Text
            fontFamily='Inter'
            fontSize='0.75rem'
            fontStyle='normal'
            fontWeight='400'
            lineHeight='1rem'
            letterSpacing='0.025rem'
            color='#8E8E8E'
          >
            Between 50 and 1000 characters
          </Text>
        </Box>
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        padding='1.5rem'
      >
        <Button
          leftIcon={<EmailIcon />}
          _hover={{ bg: '#de7b9c' }}
          color='white'
          bg='#F48FB1'
          display='flex'
          padding='2rem'
          gap='0.5rem'
          alignItems='center'
          className='text-[18.668px] font-[Inter] tracking-[1.667px] rounded-[21.3344px]'
          onClick={handleSubmit}
        >
          SEND APPLICATION
        </Button>
      </Box>
    </Box>
  );
};
