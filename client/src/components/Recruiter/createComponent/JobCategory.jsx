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

function JobCategorySelect() {
  const { profFormStyle } = useGlobalContext();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Stack spacing={4}>
      <FormControl id="jobCategory">
        <Select
          placeholder="Select a category"
          borderColor="#F48FB1"
          focusBorderColor="#F48FB1"
          value={selectedCategory}
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
