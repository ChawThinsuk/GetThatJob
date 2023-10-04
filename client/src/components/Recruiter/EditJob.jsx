import { ChakraProvider } from "@chakra-ui/react";
import React, { useState, useEffect,useRef  } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  CSSReset,
  useToast,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/registerContext.jsx";
import SalaryRangeInput from "../Recruiter/createComponent/SalaryRange.jsx";
import JobCategorySelect from "../Recruiter/createComponent/JobCategory.jsx";
import JobType from "../Recruiter/createComponent/JobType.jsx";
import { useAuth } from "../../contexts/Authorization.jsx";
import axios from "axios";
import leftArrow from '../../assets/pro2/leftArrow.svg';
import { useNavigate, useParams,Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

function EditJob() {
  const { profFormStyle } = useGlobalContext();
  const [job_title, setJob_title] = useState("");
  const [job_position, setJobPosition] = useState("");
  const [job_mandatory, setJobMandatory] = useState("");
  const [job_optional, setJobOptional] = useState("");
  const [job_category, setJobCategory] = useState("");
  const [job_type, setJobType] = useState("");
  const [job_location, setLocation] = useState("");
  const [salary_min, setSalaryMin] = useState("");
  const [salary_max, setSalaryMax] = useState("");
  const { state } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  // console.log(state.userID);
  // console.log(id)

  const getJobData = async () => {
    try {
      const res = await axios.get(
        `https://gtj-server.onrender.com/recruiter/${state.userID}/getjob/${id}`
      );
      const data = res.data.data;
      // setJobID(data.job_id)
      setJob_title(data.job_title);
      setJobCategory(data.job_category);
      setJobType(data.job_type);
      setSalaryMin(data.salary_min);
      setSalaryMax(data.salary_max);
      setJobPosition(data.job_position);
      setJobMandatory(data.job_mandatory);
      setJobOptional(data.job_optional);
      setLocation(data.job_location);
    } catch (err) {
      console.log(err);
    }
    return;
  };

  const handleSubmit = async () => {
    const jobData = {
      job_title,
      job_position,
      job_mandatory,
      job_optional,
      job_category,
      job_type,
      salary_min,
      salary_max,
      job_location
    };

    try {
      const response = await axios.put(
        `https://gtj-server.onrender.com/recruiter/editjob/${id}`,
        jobData
      );

      // console.log(response.data);

      toast({
        title: "Job Posted",
        description: "We've updated job for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 3500);
    } catch (error) {
      console.log("Registration error", error);
    }
  };

  const handleConfirmSubmit = () => {
    onClose(); // Close the confirmation dialog
    handleSubmit(); // Call your handleSubmit function
  };

  const handleMandatoryChange = (event) => {
    const value = event.target.value;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setJobMandatory(value + "`\n");
    } else {
      setJobMandatory(value);
    }
  };

  const handleOptionalChange = (event) => {
    const value = event.target.value;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setJobOptional(value + "`\n");
    } else {
      setJobOptional(value);
    }
  };

  useEffect(() => {
    getJobData();
  }, []);

  return (
    <ChakraProvider>
      <div className="flex flex-col pl-[160px] font-[Inter]">
  
        <h1 className="text-[45px] font-[Montserrat] mb-4 mt-[43px]">
          <span>    <Link to='/'>
        <button className='flex items-center h-[32.001px]'>
          <img src={leftArrow} className='w-[32.001px] h-[32.001px]' />
          <p className=' font-[Inter] text-[15px] text-[#616161]'>BACK</p>
        </button>
      </Link></span>Edit Job
        </h1>
        <div className="ml-4">
          <h1 className="text-[32px] font-[Montserrat]">Main Information</h1>
          <Box w="40%" maxW="lg" mt="12px" borderRadius="md">
            <form>
              <Stack spacing={4}>
                <FormControl id="jobTitle" isRequired>
                  <FormLabel sx={profFormStyle}>Job title</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                    type="text"
                    placeholder="Enter job title"
                    value={job_title}
                    onChange={(event) => {
                      setJob_title(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel sx={profFormStyle}>Job Category</FormLabel>
                  <JobCategorySelect
                    setJobCategory={setJobCategory}
                    value={job_category}
                  />
                </FormControl>
                <FormControl id="birthDate" isRequired>
                  <FormLabel sx={profFormStyle}>Type</FormLabel>
                  <JobType setJobType={setJobType} value={job_type} />
                </FormControl>
                <FormControl id="name" isRequired>
                  <FormLabel sx={profFormStyle}>Salary Range</FormLabel>
                  <SalaryRangeInput
                    setSalaryMin={setSalaryMin}
                    setSalaryMax={setSalaryMax}
                    min={salary_min}
                    max={salary_max}
                  />
                </FormControl>
                <FormLabel  sx={profFormStyle}>Location</FormLabel>
                <select
              value={job_location}
              style={{ outlineColor: "#F48FB1" }}
              onChange={(e) => setLocation(e.target.value)}
              className="border-[1px] mt-[-10px] border-[#F48FB1] rounded-[8px] w-full h-[42px] flex flex-row justify-center items-center text-[18px] p-[8px] font-[Inter] font-[400] text-[#8E8E8E]"
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
              </Stack>

              <h1 className="ml-2 text-[32px] font-[Montserrat] mt-[53px] mb-[11px]">
                Addtional information
              </h1>

              <Stack spacing={4}>
                <FormControl id="experience" w="100%" maxW="lg" isRequired>
                  <FormLabel sx={profFormStyle}>
                    About the job position
                  </FormLabel>
                  <Textarea
                    w="992px"
                    h="89px"
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
                    type="text"
                    placeholder="Describe the main functions and characteristics of your job position"
                    value={job_position}
                    onChange={(e) => {
                      setJobPosition(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="experience" w="100%" maxW="lg" isRequired>
                  <FormLabel sx={profFormStyle}>
                    Mandatory Requirements
                  </FormLabel>
                  <Textarea
                    w="992px"
                    h="89px"
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
                    type="text"
                    placeholder="List each mandatory requirement in a new line"
                    value={job_mandatory}
                    onChange={handleMandatoryChange}
                    onKeyDown={handleMandatoryChange}
                  />
                </FormControl>
                <FormControl id="experience" w="100%" maxW="lg" isRequired>
                  <FormLabel sx={profFormStyle}>
                    Optional Requirements
                  </FormLabel>
                  <Textarea
                    w="992px"
                    h="89px"
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
                    type="text"
                    placeholder="List each optional requirement in a new line"
                    value={job_optional}
                    onChange={handleOptionalChange}
                    onKeyDown={handleOptionalChange}
                  />
                </FormControl>
              </Stack>
            </form>
          </Box>
          <div className=" flex flex-col mt-[11px]">
            <Button
              letterSpacing="2px"
              w="220px"
              h="53px"
              mt={8}
              mb={8}
              type="button"
              bg="#F48FB1"
              variant="solid"
              size="sm"
              fontSize="19px"
              color="white"
              borderRadius="19px"
              onClick={onOpen} // Open the confirmation dialog
            >
              SAVE EDIT
            </Button>
            <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmation
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to save the edits?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose} // Close the dialog without submitting
              >
                Cancel
              </Button>
              <Button
                colorScheme="pink"
                onClick={handleConfirmSubmit} // Call handleSubmit when confirmed
                ml={3}
              >
                Save Edits
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default EditJob;
