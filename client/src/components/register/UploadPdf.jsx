import React, { useState } from "react";
import uploadlogo from "../../assets/register-images/pdf-upload.svg";
import { useGlobalContext } from "../../contexts/registerContext";
import { useToast, Button } from "@chakra-ui/react"; // Import Button component

const UploadPdf = () => {
  const { cv, setCv, logo, setLogo, userType } = useGlobalContext();
  const [selectedFileName, setSelectedFileName] = useState(null);
  const toast = useToast(); // Move toast declaration outside of the function

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (userType === "PROFESSIONAL") {
      if (file) {
        if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
          setCv(file);
          setSelectedFileName(file.name);
        } else {
          setCv(null);
          setSelectedFileName(null);
          ToastExample();
        }
      }
    }
    if (userType === "RECRUITER") {
      if (file) {
        if (file.size <= 5 * 1024 * 1024) {
          setLogo(file);
          setSelectedFileName(file.name);
        } else {
          setLogo(null);
          setSelectedFileName(null);
        }
      }
    }
  };

  const ToastExample = () => {
    toast({
      title: "Wrong file type",
      description: "Please upload your PDF file",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div className="mx-auto bg-white rounded-lg flex">
      <input
        type="file"
        id="pdf-upload"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="pdf-upload"
        className="cursor-pointer flex items-center justify-center w-[160px] h-auto p-[13px] rounded-xl bg-[#F48FB1] text-white hover:bg-pink-600 transition duration-300"
      >
        <img src={uploadlogo} className="pr-2" alt="logo" />
        Choose a file
      </label>

      {selectedFileName && (
        <div className="mt-2 ml-4">
          <p>File selected: {selectedFileName}</p>
        </div>
      )}

      {cv && (
        <div className="mt-2">
          <p>File selected: {cv.name}</p>
        </div>
      )}
      {cv == null && userType === "PROFESSIONAL" && (
        <div className="ml-4 mt-3">
          <p>No file chosen</p>
        </div>
      )}
      {cv === null && userType === "RECRUITER" && (
        <div className="ml-4 mt-3">
          <p>No file chosen</p>
        </div>
      )}
      {cv === null && (
        <div id="file-error" className="text-red-600 mt-2 hidden">
          Invalid file. Please choose a PDF file under 5MB.
        </div>
      )}

      {logo && (
        <div className="mt-2">
          <p>File selected: {logo.name}</p>
        </div>
      )}
      {logo === null && userType === "RECRUITER" && (
        <div className="ml-4 mt-3">
          <p>No file chosen</p>
        </div>
      )}
      {logo === null && (
        <div id="file-error" className="text-red-600 mt-2 hidden">
          Invalid file. Please choose a PDF file under 5MB.
        </div>
      )}
    </div>
  );
};

export default UploadPdf;
