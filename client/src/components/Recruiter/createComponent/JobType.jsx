// jobType.jsx
import React, { useState } from "react";
import {
  Box,
  Select,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../../contexts/registerContext.jsx";

const jobType = ["Full-Time", "Part-Time", "Freelance"];

function JobType({ setJobType, value }) {
  const { profFormStyle } = useGlobalContext();
  const [job_type, setJobTypeLocal] = useState();

  const handleCategoryChange = (e) => {
    setJobTypeLocal(e.target.value);
    setJobType(e.target.value);
  };

  return (
    <Stack spacing={4}>
      <FormControl id="jobCategory">
        <Select
          fontWeight="400"
          color="#8E8E8E"
          background="#FFFFFF"
          placeholder="Select a type"
          borderColor="#F48FB1"
          focusBorderColor="#F48FB1"
          _hover={{ borderColor: "#F48FB1" }}
          value={value}
          onChange={handleCategoryChange}
        >
          {jobType.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

export default JobType;
