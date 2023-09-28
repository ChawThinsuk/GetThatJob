// JobCategorySelect.js
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

const jobCategories = [
  "Administrative and clerical",
  "Customer service",
  "Sales and marketing",
  "IT and engineering",
  "Education and healthcare",
  "Business and finance",
  "Legal",
  "Creative and media",
  "Trades and labor",
  "Restaurant and hospitality",
];

function JobCategorySelect({ setJobCategory,value }) {
  const { profFormStyle } = useGlobalContext();
  const [job_category, setJobCategoryLocal] = useState();
  // console.log(value);

  const handleCategoryChange = (event) => {
    setJobCategoryLocal(event.target.value);
    setJobCategory(event.target.value); // Update the parent component's state
  };

  return (
    <Stack spacing={4}>
      <FormControl id="jobCategory">
        <Select
          placeholder="Select a category"
          borderColor="#F48FB1"
          focusBorderColor="#F48FB1"
          value={value}
          onChange={handleCategoryChange}
        >
          {jobCategories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </Select>
        <FormHelperText>Select a category from the list.</FormHelperText>
      </FormControl>
    </Stack>
  );
}

export default JobCategorySelect;
