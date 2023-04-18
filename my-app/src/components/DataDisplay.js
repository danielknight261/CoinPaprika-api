import React from "react";
import { MdOutlineRefresh } from "react-icons/md";

// DataDisplay component with selectedCrypto, displayData, and onRefreshClick passed as props
function DataDisplay({ selectedCrypto, displayData, onRefreshClick }) {
  // Render the DataDisplay component
  return (
    <div className="relative mt-8 py-16 rounded-2xl bg-gradient-to-r from-[#f67a60] to-[#f59f9a]">
      {/* Container for the refresh button */}
      <div className="absolute top-0 right-0 p-2">
        {/* Button to trigger data refresh with a refresh icon */}
        <button
          className="text-white focus:outline-none"
          onClick={onRefreshClick}
        >
          <MdOutlineRefresh size={40} />
        </button>
      </div>

      {/* Display container for selected cryptocurrency and its value */}
      <div className="flex justify-center items-center h-full">
        {/* Display the selected cryptocurrency */}
        <p className="text-xl text-white text-center w-full">
          {selectedCrypto}
          {/* Display the value of the selected cryptocurrency */}
          <p className="text-3xl font-bold text-white text-center w-full">
            {displayData}
          </p>
        </p>
      </div>
    </div>
  );
}

export default DataDisplay;
