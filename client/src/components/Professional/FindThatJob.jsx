import find from "../../assets/FindThatJob/find.svg";
import money from "../../assets/FindThatJob/money.svg";
import { useEffect, useState, useRef } from "react";
import { usePro } from "../../contexts/Professional";
import { AiOutlineClose } from "react-icons/ai";
import { debounce } from "lodash";
import JobCard from "./JobCard";

export const FindThatJob = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermShow, setSearchTermShow] = useState('');
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [location, setLocation] = useState("");
  const [autoComplete, setAutoComplete] = useState([])
  const [openAutoComplete, setOpenAutoComplete] = useState(false);
  const autoCompleteRef = useRef("autoComplete");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const { jobs, getJobs, getPopularJob, popularJobs,isLoading, setIsLoading } = usePro();


  useEffect(() => {
    getJobs({
      searchTerm,
      category,
      type,
      minSalary,
      maxSalary,
      location,
    }),
      getPopularJob();
    autoCompleteData();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchTerm, category, type, minSalary, maxSalary, location]);

  const autoCompleteData = () => {
    const autocompleteList = [];
    jobs.map((job) => {
      if (
        !autocompleteList.includes(job.job_title) &&
        !autocompleteList.includes(job.job_category)
      ) {
        autocompleteList.push(job.job_title);
        autocompleteList.push(job.job_category);
      }
    });
    setAutoComplete(
      autocompleteList
        .filter((list) =>
          list.toUpperCase().includes(searchTermShow.toUpperCase())
        )
        .sort()
    );
  };
  const handleClickOutside = (event) => {
    if (
      autoCompleteRef.current &&
      !autoCompleteRef.current.contains(event.target)
    ) {
      setOpenAutoComplete(false);

    
    }
  };
  const handleSearchTermChange = debounce((search) => {
    setSearchTerm(search);
  }, 500);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobs?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPagesz = Math.ceil((jobs?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="flex flex-col justify-start items-center w-full min-h-[1080px] pr-[100px] pl-[100px] pt-[50px] font-[Inter] bg-[#F5F5F6]">
      <div className="flex flex-col justify-center items-start w-full">
        <p className="text-[46px] text-start w-full font-[Montserrat] font-[400] text-[#373737]">
          Find That Job
        </p>
        <div className="flex flex-row">
          <div className="flex flex-col pr-[16px]">
            <label className="text-[14px] pt-[16px] font-[Inter] font-[400] text-[#616161]">
              SEARCH BY JOB TITLE OR COMPANY NAME
            </label>
            <div className="relative border-[1px] border-[#F48FB1] rounded-[8px] w-[560px] h-[42px] flex flex-row justify-start items-center bg-[#FFFFFF]">
              <img src={find} className="w-[22] h-[22] pl-2" />
              <input
                type='text'
                placeholder='manufacturing, sales, swim'
                className='w-[500px] h-[27px] text-[18px] p-[8px] leading-6 outline-none font-[Inter] font-[400] text-[#8E8E8E]'
                value={searchTermShow}
                onChange={(e) => {
                  setSearchTermShow(e.target.value);
                  handleSearchTermChange(e.target.value);
                  setOpenAutoComplete(true);
                }}
              />
              {searchTermShow !== '' && (
                <button
                  className='absolute right-2 opacity-20 hover:opacity-75'
                  onClick={() => {
                    setSearchTermShow('');
                    setSearchTerm('');
                  }}
                >
                  <AiOutlineClose />
                </button>
              )}
              {searchTerm && openAutoComplete && (
                <div
                  ref={autoCompleteRef}
                  className='absolute z-50 top-[45px] pt-2 pb-1 max-h-[300px] overflow-auto  right-0 border-[1px] bg-white border-gray-300 shadow-xl w-full rounded-xl '
                >
                  {autoComplete.map((list, index) => {
                    return (
                      <p
                        key={index}
                        className='flex items-center h-[30px] font-semibold pl-2 w-full cursor-pointer hover:bg-gray-100'
                        onClick={() => {
                          setSearchTerm(list);
                          setSearchTermShow(list);
                          setOpenAutoComplete(false);
                        }}
                      >
                        {list}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="w-[400px]">
            <p className="text-[14px] pt-[16px] font-[Inter] font-[400] text-[#616161]">
              LOCATION
            </p>
            <select
              value={location}
              style={{ outlineColor: "#F48FB1" }}
              onChange={(e) => setLocation(e.target.value)}
              className="border-[1px] border-[#F48FB1] rounded-[8px] w-full h-[42px] flex flex-row justify-center items-center text-[18px] p-[8px] font-[Inter] font-[400] text-[#8E8E8E]"
            >
              <option value={""}>Select a location</option>
              <optgroup label="North">
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
              <optgroup label="Northeast">
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
              <optgroup label="Bangkok and surrounding areas">
                <option>Bangkok</option>
                <option>Nakhon Pathom</option>
                <option>Nonthaburi</option>
                <option>Pathum Thani</option>
                <option>Samut Prakan</option>
                <option>Samut Sakhon</option>
              </optgroup>
              <optgroup label="Central">
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
              <optgroup label="East">
                <option>Chachoengsao</option>
                <option>Chanthaburi</option>
                <option>Chon Buri</option>
                <option>Prachinburi</option>
                <option>Rayong</option>
                <option>Sa Kaeo</option>
                <option>Trat</option>
              </optgroup>
              <optgroup label="West">
                <option>Kanchanaburi</option>
                <option>Prachuap Khiri Khan</option>
                <option>Phetchaburi</option>
                <option>Ratchaburi</option>
                <option>Tak</option>
              </optgroup>
              <optgroup label="South">
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
        <div className="flex flex-rows pt-[8px]">
          <div className="pr-[16px] w-[375px]">
            <p className="text-[14px] font-[Inter] font-[400] text-[#616161]">
              CATEGORY
            </p>
            <select
              value={category}
              style={{ outlineColor: "#F48FB1" }}
              onChange={(e) => setCategory(e.target.value)}
              className="border-[1px] border-[#F48FB1] rounded-[8px] w-full h-[42px] flex flex-row justify-center items-center text-[18px] p-[8px] font-[Inter] font-[400] text-[#8E8E8E]"
            >
              <option value={""}>Select a category</option>
              <option>Software Developer</option>
              <option>Sales</option>
              <option>Graphic Designer</option>
              <option>Digital Marketing</option>
              <option>Administrative and clerical</option>
              <option>Customer service</option>
              <option>Sales and marketing</option>
              <option>IT and engineering</option>
              <option>Education and healthcare</option>
              <option>Business and finance</option>
              <option>Legal</option>
              <option>Creative and media</option>
              <option>Trades and labor</option>
              <option>Restaurant and hospitality</option>
            </select>
          </div>
          <div className="pr-[16px] w-[375px]">
            <p className="text-[14px] font-[Inter] font-[400] text-[#616161]">
              TYPE
            </p>
            <select
              value={type}
              style={{ outlineColor: "#F48FB1" }}
              onChange={(e) => setType(e.target.value)}
              className="border-[1px] border-[#F48FB1] rounded-[8px] w-full h-[42px] flex flex-row justify-center items-center text-[18px] p-[8px] font-[Inter] font-[400] text-[#8E8E8E]"
            >
              <option value={""}>Select a type</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Freelance</option>
            </select>
          </div>
          <div>
            <p className="text-[14px] font-[Inter] font-[400] text-[#616161]">
              SALARY RANGE
            </p>
            <div className="flex flex-rows justify-between items-center w-[308px]">
              <div className="border-[1px] border-[#F48FB1] rounded-[8px] w-[136px] h-[42px] flex flex-row justify-start items-center bg-[#FFFFFF]">
                <img src={money} className="pl-2" />
                <input
                  type="text"
                  placeholder="min"
                  className="w-[77px] h-[27px] flex flex-col justify-center text-[18px] p-[8px] leading-6 outline-none font-[Inter] font-[400] text-[#8E8E8E]"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                />
              </div>
              <p>-</p>
              <div className="border-[1px] border-[#F48FB1] rounded-[8px] w-[136px] h-[42px] flex flex-row justify-start items-center bg-[#FFFFFF]">
                <img src={money} className="pl-2" />
                <input
                  type="text"
                  placeholder="max"
                  className="w-[77px] h-[27px] flex flex-col justify-center text-[18px] p-[8px] leading-6 outline-none font-[Inter] font-[400] text-[#8E8E8E]"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start w-full  pt-[12px]">
        <div className="mb-[16px] w-full">
          <div className="flex flex-row gap-3 mt-2  items-center w-full">
            <p className="font-[Inter] text-[15px] ">Popular searches:</p>
            {popularJobs.map((job, index) => {
              if (index <= 7) {
                return (
                  <div key={index} className="flex flex-row gap-3">
                    <p
                      className={`${
                        job === searchTerm ? "bg-[#F48FB1] text-white" : "bg-gray-300 text-[#616161]"
                      } rounded-xl py-[5px] px-[15px] text-[12px] hover:cursor-pointer`}
                      onClick={() => {
                        setSearchTerm(job);
                        setSearchTermShow(job);
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
          <div> <p className="text-[30px] text-start w-full font-[Montserrat] font-[500] mt-[20px]">
            {jobs.length} jobs for you
          </p></div>
          
        </div>
      
        <div className="flex flex-wrap justify-start gap-[16px] w-[1280px] h-srceen mt-[10px]">
          {currentItems.map((job,index) => (
            <JobCard job={job} key={job.job_id} index={index} page={currentPage} />
          ))}
          <div className="flex justify-center w-full mt-[40px] mb-[40px] mr-3">
        <PaginationControls
        totalPages={totalPagesz}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
        </div>
        </div>
      </div>
    </div>
  )
}

function PaginationControls({ totalPages, currentPage, handlePageChange }) {
  return (
    <>
    {console.log(currentPage)}
      <div className="flex justify-start">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-10 w-25 ml-0 leading-tight  rounded-l-lg font-[Inter] text-[16px] ${
                  currentPage === 1 ? "cursor-not-allowed bg-ggrey-200 text-ggrey-100" : "bg-[#f190b1] text-white"
                }`}
                onClick={
                  currentPage === 1
                    ? null
                    : () => handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                Previous
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center justify-center px-3 h-10 w-10 leading-tight text-white hover:bg-[#f190b1] font-[Inter] text-[16px] ${
                    currentPage === index + 1
                      ? "bg-[#f38fb1]"
                      : "bg-rose-200 "
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-10 w-25 leading-tight rounded-r-lg   font-[Inter] text-[16px] ${
                  currentPage === totalPages
                    ? "cursor-not-allowed bg-ggrey-200 text-ggrey-100"
                    : "bg-[#f190b1] text-white"
                }`}
                onClick={
                  currentPage === totalPages
                    ? null
                    : () => handlePageChange(currentPage + 1)
                }
                
                disabled={currentPage === totalPages}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
