import React, { useState } from "react";
import uploadlogo from "../../assets/register-images/pdf-upload.svg";
import { useGlobalContext } from "../../contexts/registerContext";
import { useToast } from "@chakra-ui/react";

const UploadPdf = () => {
  const { cv, setCv, logo, setLogo, userType } = useGlobalContext();
  const [selectedFileName, setSelectedFileName] = useState(null);
  const toast = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (userType === "PROFESSIONAL") {
      if (file) {
        if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
          setCv(file);
          setSelectedFileName(file.name);
          // console.log(file.name);
        } else {
          setCv(null);
          setSelectedFileName(null);
          toast({
            title: "Wrong file type or size",
            description: "Please upload a PDF file under 5MB.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        // No file selected, clear the selected file and file name
        setCv(null);
        setSelectedFileName(null);
      }
    }
    if (userType === "RECRUITER") {
      if (file) {
        // Check for allowed file types (JPG and PNG)
        if (
          /(jpg|jpeg|png)$/i.test(file.type) &&
          file.size <= 5 * 1024 * 1024
        ) {
          setLogo(file);
          setSelectedFileName(file.name);
        } else {
          setLogo(null);
          setSelectedFileName(null);
          toast({
            title: "Wrong file type or size",
            description: "Please upload a JPG or PNG file under 5MB.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        // No file selected, clear the selected file and file name
        setLogo(null);
        setSelectedFileName(null);
      }
    }
  };

  return (
    <div className="mx-auto bg-white rounded-lg flex">
      <input
        type="file"
        id="pdf-upload"
        className="hidden"
        onChange={handleFileChange}
        accept={
          userType === "PROFESSIONAL"
            ? ".pdf"
            : userType === "RECRUITER"
            ? ".jpg,.jpeg,.png"
            : undefined // Allow any file type if not specified
        }
      />
      <label
        htmlFor="pdf-upload"
        className="cursor-pointer flex items-center justify-center w-[160px] h-auto p-[13px] rounded-xl bg-[#F48FB1] hover:bg-[#BF5F82] text-white transition duration-300"
      >
        <img src={uploadlogo} className="pr-2" alt="logo" />
        {userType === "PROFESSIONAL"
          ? "Choose a file"
          : userType === "RECRUITER"
          ? "Choose a file"
          : "Choose a file"}
      </label>

      {selectedFileName ? (
        <div className="mt-4 ml-4">
          <p>File selected: {selectedFileName}</p>
        </div>
      ) : (
        <div className="ml-4 mt-3">
          <p>No file chosen</p>
        </div>
      )}

      {cv && (
        <div className="mt-2">
          <p>File selected: {cv.name}</p>
        </div>
      )}
      {cv === null && userType === "PROFESSIONAL" && (
        <div className="ml-4 mt-3">
          <p>No file chosen</p>
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
    </div>
  );
};

export default UploadPdf;
