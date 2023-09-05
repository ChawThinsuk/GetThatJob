import React, { useState } from "react";

const UploadDiv = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
      }
    }
  };

  const handleSubmit = () => {
    // Handle the file submission logic here
    if (selectedFile) {
      console.log(`Uploading file: ${selectedFile.name}`);
      // You can send the file to a server or perform any other action here
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <input
        type="file"
        id="pdf-upload"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <label
        htmlFor="pdf-upload"
        className="cursor-pointer flex items-center justify-center w-[118px] h-auto p-[8px] bg-[#F48FB1] text-white rounded-md hover:bg-pink-600 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          {/* Add your SVG icon here */}
        </svg>
        {selectedFile ? selectedFile.name : "Select a PDF"}
      </label>
      {selectedFile && (
        <div className="mt-2">
          <p>File selected: {selectedFile.name}</p>
        </div>
      )}
      {selectedFile === null && (
        <div className="mt-2">
          <p>No file choosen</p>
        </div>
      )}
      {selectedFile === null && (
        <div id="file-error" className="text-red-600 mt-2 hidden">
          Invalid file. Please choose a PDF file under 5MB.
        </div>
      )}
      <label
        htmlFor="pdf-upload"
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        Only PDF. Max size 5MB
      </label>
    </div>
  );
};

export default UploadDiv;
