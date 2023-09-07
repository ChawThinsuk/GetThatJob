import React, { useState } from "react";
import uploadlogo from "../../assets/register-images/pdf-upload.svg";
import { useGlobalContext } from "../../contexts/registerContext";

const UploadPdf = () => {
  const { cv, setCv, logo, setLogo, userType } = useGlobalContext();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (userType === "PROFESSIONAL") {
      if (file) {
        if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
          setCv(file);
        } else {
          setCv(null);
        }
      }
    }
    if (userType === "RECRUITER") {
      if (file) {
        if (file.size <= 5 * 1024 * 1024) {
          setLogo(file);
        } else {
          setLogo(null);
        }
      }
    }
  };

  // const handleSubmit = () => {
  //   // Handle the file submission logic here
  //   if (selectedFile) {
  //     console.log(`Uploading file: ${selectedFile.name}`);
  //     // You can send the file to a server or perform any other action here
  //   }
  // };

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

      {cv && (
        <div className="mt-2">
          <p>File selected: {cv}</p>
        </div>
      )}
      {cv === null && (
        <div className="ml-4 mt-3">
          <p>No file choosen</p>
        </div>
      )}
      {cv === null && (
        <div id="file-error" className="text-red-600 mt-2 hidden">
          Invalid file. Please choose a PDF file under 5MB.
        </div>
      )}

      {logo && (
        <div className="mt-2">
          <p>File selected: {logo}</p>
        </div>
      )}
      {logo === null && (
        <div className="ml-4 mt-3">
          <p>No file choosen</p>
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
