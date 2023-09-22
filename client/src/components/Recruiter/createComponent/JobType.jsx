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

function JobType() {
  const { profFormStyle } = useGlobalContext();
  const [selectedType, setselectedType] = useState("");

  const handleCategoryChange = (e) => {
    setselectedType(e.target.value);
  };

  return (
    <Stack spacing={4}>
      <FormControl id="jobCategory">
        <Select
          placeholder="Select a type"
          borderColor="#F48FB1"
          focusBorderColor="#F48FB1"
          value={selectedType}
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
