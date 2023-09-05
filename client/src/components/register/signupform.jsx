import React, { useState } from "react";
import {
  ChakraProvider,
  Textarea,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../utils/context.jsx";
import pointingGirl from "../../assets/register-images/woman-pointing.svg";
import SelectType from "./selectUserType.jsx";
import TalentFormProgress from "./TalentFormProgress.jsx";
import TalentFormProgress2 from "./TalentFormProgress2.jsx";
import TalentFormProgress3 from "./TalentFormProgress3.jsx";
import RecruiterFormProgress from "./RecruiterFormProgress.jsx";
import RecruiterFormProgress2 from "./RecruiterFormProgress2.jsx";

function Professional() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [userType, setUserType] = useState("PROFESSIONAL");

  return (
    <div className="flex w-full mt-10">
      {/* Left */}
      <div className="flex flex-col w-[50%] font-[Inter]">
        <SelectType />
        <TalentFormProgress />
        <TalentFormProgress2 />
        <TalentFormProgress3 />
        <RecruiterFormProgress />
        <RecruiterFormProgress2 />
      </div>
      {/* Right */}
      <div className="flex w-[50%] justify-center items-end">
        <img src={pointingGirl} alt="" width="50%" />
      </div>
    </div>
  );
}

export default Professional;
