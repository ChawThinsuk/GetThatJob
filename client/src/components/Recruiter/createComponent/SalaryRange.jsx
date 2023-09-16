import React from "react";

function SalaryRangeInput({ minSalary, maxSalary, onMinChange, onMaxChange }) {
  return (
    <div className="flex items-center">
      <div className="relative">
        <img
          src="/src/assets/dollorSign.svg"
          alt="Dollar Sign"
          className="absolute left-0 bottom-4 pl-3 flex items-center pointer-events-none"
        />
        <input
          className="w-[136px] h-[48px] pl-12 pr-4 text-gray-700 border border-[#F48FB1]  rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
          type="number"
          placeholder="min"
          value={minSalary}
          onChange={(e) => onMinChange(e.target.value)}
        />
      </div>
      <span className="mx-2">-</span>
      <div className="relative">
        <img
          src="/src/assets/dollorSign.svg"
          alt="Dollar Sign"
          className="absolute left-0 bottom-4 pl-3 flex items-center pointer-events-none"
        />
        <input
          className="w-[136px] h-[48px] pl-12 pr-4 text-gray-700 border border-[#F48FB1] rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
          type="number"
          placeholder="max"
          value={maxSalary}
          onChange={(e) => onMaxChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SalaryRangeInput;
