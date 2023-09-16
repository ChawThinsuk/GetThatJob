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

const jobCategories = {
  "Administrative and clerical": [
    "Administrative assistant",
    "Executive assistant",
    "Office manager",
    "Human resources assistant",
    // Add more sub-categories here
  ],
  "Customer service": [
    "Customer service manager",
    "Account executive",
    // Add more sub-categories here
  ],
  "Sales and marketing": [
    "Sales representative",
    "Account executive",
    // Add more sub-categories here
  ],
  "IT and engineering": [
    "Software engineer",
    "Web developer",
    // Add more sub-categories here
  ],
  "Education and healthcare": [
    "Teacher",
    "Nurse",
    // Add more sub-categories here
  ],
  "Business and finance": [
    "Accountant",
    "Financial analyst",
    // Add more sub-categories here
  ],
  Legal: [
    "Lawyer",
    "Paralegal",
    // Add more sub-categories here
  ],
  "Creative and media": [
    "Graphic designer",
    "Photographer",
    // Add more sub-categories here
  ],
  "Trades and labor": [
    "Electrician",
    "Plumber",
    // Add more sub-categories here
  ],
  "Restaurant and hospitality": [
    "Waiter",
    "Waitress",
    // Add more sub-categories here
  ],
};

function JobCategorySelect() {
  const { profFormStyle } = useGlobalContext();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
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
          {Object.keys(jobCategories).map((parentCategory) => (
            <option value={parentCategory} key={parentCategory}>
              {parentCategory}
            </option>
          ))}
        </Select>
        <FormHelperText>Select a category from the list.</FormHelperText>
      </FormControl>

      {selectedCategory && (
        <FormControl id="subCategory">
          <FormLabel sx={profFormStyle}>Sub-Category</FormLabel>
          <Select
            placeholder="Select a sub-category"
            borderColor="#F48FB1"
            focusBorderColor="#F48FB1"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
          >
            {jobCategories[selectedCategory].map((subCategory) => (
              <option value={subCategory} key={subCategory}>
                {subCategory}
              </option>
            ))}
          </Select>
          <FormHelperText>Select a sub-category from the list.</FormHelperText>
        </FormControl>
      )}
    </Stack>
  );
}

export default JobCategorySelect;
