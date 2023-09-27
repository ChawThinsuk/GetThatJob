import find from '../../assets/FindThatJob/find.svg';
import money from '../../assets/FindThatJob/money.svg';
import { useEffect, useState , useRef } from 'react';
import { usePro } from '../../contexts/Professional';
import { AiOutlineClose } from 'react-icons/ai';
import { debounce } from 'lodash';
import JobCard from './JobCard';


export const FindThatJob = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [location, setLocation] = useState('');
  const { jobs, getJobs, getPopularJob, popularJobs } = usePro();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9; // Number of jobs to display per page

  useEffect(() => {
    getJobs({ searchTerm, category, type, minSalary, maxSalary, location });
    getPopularJob();
  }, [searchTerm, category, type, minSalary, maxSalary, location]);

  // Calculate the indexes of jobs to display for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const jobsToDisplay = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Calculate total number of pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <div className='flex flex-col justify-start items-center w-full min-h-srceen pr-[100px] pl-[100px] pt-[50px] font-[Inter] bg-[#F5F5F6]'>
      <div className='flex flex-col justify-center items-start w-full'>
        <p className='text-[46px] text-start w-full font-[Montserrat] font-[400] text-[#373737]'>
          Find That Job
        </p>
        <div className='flex flex-row'>
          <div className='flex flex-col pr-[16px]'>
            <p className='text-[14px] pt-[16px] font-[Inter] font-[400] text-[#616161]'>
              SEARCH BY JOB TITLE OR COMPANY NAME
            </p>
            <div className='relative border-[1px] border-[#F48FB1] rounded-[8px] w-[560px] h-[42px] flex flex-row justify-start items-center bg-[#FFFFFF]'>
              <img src={find} className='w-[22] h-[22] pl-2' />
              <input
                type='text'
                placeholder='manufacturing, sales, swim'
                className='w-[500px] h-[27px] text-[18px] p-[8px] leading-6 outline-none font-[Inter] font-[400] text-[#8E8E8E]'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm !== '' && (
                <button
                  className='absolute right-2 opacity-20 hover:opacity-75'
                  onClick={() => setSearchTerm('')}
                >
                  <AiOutlineClose />
                </button>
              )}
            </div>
          </div>
          <div className='w-[400px]'>
            <p className='text-[14px] pt-[16px] font-[Inter] font-[400] text-[#616161]'>
              LOCATION
            </p>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='border-[1px] border-[#F48FB1] rounded-[8px] w-full h-[42px] flex flex-row justify-center items-center text-[18px] p-[8px] font-[Inter] font-[400] text-[#8E8E8E]'
            >
              <option value={''}>Select a location</option>
              <optgroup label='North'>
                <option>Chiang Mai</option>
                <option>Chiang Rai</option>
                <option>Lampang</option>
                <option>Lamphun</option>
                <option>Mae Hong Son</option>
                <option>Nan</option>
                <option>Phayao</option>
                <option>Phrae</option>
                <option>Uttaradit</option>
              </optgroup>
              <optgroup label='Northeast'>
                <option>Amnat Charoen</option>
                <option>Bueng Kan</option>
                <option>Buri Ram</option>
                <option>Chaiyaphum</option>
                <option>Kalasin</option>
                <option>Khon Kaen</option>
                <option>Loei</option>
                <option>Maha Sarakham</option>
                <option>Mukdahan</option>
                <option>Nakhon Phanom</option>
                <option>Nakhon Ratchasima</option>
                <option>Nong Bua Lamphu</option>
                <option>Nong Khai</option>
                <option>Roi Et</option>
                <option>Sakon Nakhon</option>
                <option>Si Sa Ket</option>
                <option>Surin</option>
                <option>Yasothon</option>
                <option>Ubon Ratchathani</option>
                <option>Udon Thani</option>
              </optgroup>
              <optgroup label='Bangkok and surrounding areas'>
                <option>Bangkok</option>
                <option>Nakhon Pathom</option>
                <option>Nonthaburi</option>
                <option>Pathum Thani</option>
                <option>Samut Prakan</option>
                <option>Samut Sakhon</option>
              </optgroup>
              <optgroup label='Central'>
                <option>Ang Thong</option>
                <option>Chai Nat</option>
                <option>Lopburi</option>
                <option>Kamphaeng Phet</option>
                <option>Nakhon Nayok</option>
                <option>Nakhon Sawan</option>
                <option>Phichit</option>
                <option>Phitsanulok</option>
                <option>Phetchabun</option>
                <option>Phra Nakhon Si Ayutthaya</option>
                <option>Samut Songkhram</option>
                <option>Sara buri</option>
                <option>Sing Buri</option>
                <option>Sukhothai</option>
                <option>Suphan Buri</option>
                <option>Uthai Thani</option>
              </optgroup>
              <optgroup label='East'>
                <option>Chachoengsao</option>
                <option>Chanthaburi</option>
                <option>Chon Buri</option>
                <option>Prachinburi</option>
                <option>Rayong</option>
                <option>Sa Kaeo</option>
                <option>Trat</option>
              </optgroup>
              <optgroup label='West'>
                <option>Kanchanaburi</option>
                <option>Prachuap Khiri Khan</option>
                <option>Phetchaburi</option>
                <option>Ratchaburi</option>
                <option>Tak</option>
              </optgroup>
              <optgroup label='South'>
                <option>Chumphon</option>
                <option>Krabi</option>
                <option>Nakhon Si Thammarat</option>
                <option>Narathiwat</option>
                <option>Pattani</option>
                <option>Phangnga</option>
                <option>Phatthalung</option>
                <option>Phuket</option>
                <option>Ranong</option>
                <option>Satun</option>
                <option>Songkhla</option>
                <option>Trang</option>
                <option>Yala</option>
                <option>Surat Thani</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className='flex flex-rows pt-[8px]'>
          <div className='pr-[16px] w-[375px]'>
            <p className='text-[14px] font-[Inter] font-[400] text-[#616161]'>
              CATEGORY
            </p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='border-[1px] border-[#F48FB1] rounded-[8px] w-full h-[42px] flex flex-row justify-center items-center text-[18px] p-[8px] font-[Inter] font-[400] text-[#8E8E8E]'
            >
              <option value={''}>Select a category</option>
              <option>Software Developer</option>
              <option>Sales</option>
              <option>Graphic Designer</option>
              <option>Digital Marketing</option>
            </select>
          </div>
          <div className='pr-[16px] w-[375px]'>
            <p className='text-[14px] font-[Inter] font-[400] text-[#616161]'>
              TYPE
            </p>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='border-[1px] border-[#F48FB1] rounded-[8px] w-full h-[42px] flex flex-row justify-center items-center text-[18px] p-[8px] font-[Inter] font-[400] text-[#8E8E8E]'
            >
              <option value={''}>Select a type</option>
              <option>Full time</option>
              <option>Part time</option>
            </select>
          </div>
          <div>
            <p className='text-[14px] font-[Inter] font-[400] text-[#616161]'>
              SALARY RANGE
            </p>
            <div className='flex flex-rows justify-between items-center w-[308px]'>
              <div className='border-[1px] border-[#F48FB1] rounded-[8px] w-[136px] h-[42px] flex flex-row justify-start items-center bg-[#FFFFFF]'>
                <img src={money} className='pl-2' />
                <input
                  type='text'
                  placeholder='min'
                  className='w-[77px] h-[27px] flex flex-col justify-center text-[18px] p-[8px] leading-6 outline-none font-[Inter] font-[400] text-[#8E8E8E]'
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                />
              </div>
              <p>-</p>
              <div className='border-[1px] border-[#F48FB1] rounded-[8px] w-[136px] h-[42px] flex flex-row justify-start items-center bg-[#FFFFFF]'>
                <img src={money} className='pl-2' />
                <input
                  type='text'
                  placeholder='max'
                  className='w-[77px] h-[27px] flex flex-col justify-center text-[18px] p-[8px] leading-6 outline-none font-[Inter] font-[400] text-[#8E8E8E]'
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-start w-full  pt-[12px]'>
        <div className='mb-[16px]'>
          <div className='flex flex-row gap-3 mb-4 items-center w-screen'>
            <p className='font-[Inter] text-[14px] '>Popular searches:</p>
            {popularJobs.map((job, index) => {
              if (index <= 7) {
                return (
                  <div key={index} className='flex flex-row gap-3'>
                    <p
                      className={`${
                        job === searchTerm ? 'bg-[#fecbdb]' : 'bg-gray-300'
                      } rounded-xl py-[1px] px-[5px] text-[13px] hover:cursor-pointer`}
                      onClick={() => {
                        setSearchTerm(job);
                        setCategory('');
                        setType('');
                        setMaxSalary('');
                        setMinSalary('');
                        setLocation('');
                      }}
                    >
                      {job}
                    </p>
                  </div>
                );
              }
            })}
          </div>
          <p className='text-[20px] text-start w-full font-[Montserrat] font-[500]'>
            {jobs.length} jobs for you
          </p>
        </div>
        <div className='flex flex-wrap justify-start gap-[16px] w-[1280px] h-srceen'>
            {jobsToDisplay.map((job) => (
              <JobCard job={job} key={job.job_id} />
            ))}
          </div>
          <div className='pagination-controls'>
            <button className='cursor-pointer mx-5 my-10 transition-all 
bg-pink-300 text-white px-6 py-2 rounded-lg
border-pink-400
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-pink-300 shadow-pink-300 active:shadow-none' onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button className='cursor-pointer mx-5 transition-all 
bg-pink-300 text-white px-6 py-2 rounded-lg
border-pink-400
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-pink-300 shadow-pink-300 active:shadow-none' onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
      </div>
    </div>
  );
};
        