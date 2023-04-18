import React from "react";
import { AiFillCaretDown } from "react-icons/ai";

// CryptoSelector component with selectedCrypto and onCryptoChange passed as props
function CryptoSelector({ selectedCrypto, onCryptoChange }) {
  // Function to handle changes in the crypto selection
  const handleCryptoChange = (e) => {
    onCryptoChange(e.target.value);
  };

  // Render the CryptoSelector component
  return (
    <div className="w-full">
      <form>
        <div className="relative w-full">
          {/* Dropdown select element for choosing a cryptocurrency */}
          <select
            id="crypto"
            name="crypto"
            value={selectedCrypto}
            onChange={handleCryptoChange}
            className="w-full px-4 py-4 bg-opacity-0 text-[#499eb3] font-bold rounded-3xl text-lg border border-[#499eb3] bg-transparent appearance-none"
          >
            {/* Default disabled option */}
            <option value="" disabled>
              Select your crypto
            </option>
            {/* Bitcoin option */}
            <option className="font-bold" value="Bitcoin - BTC">
              Bitcoin - BTC
            </option>
            {/* Ethereum option */}
            <option className="font-bold" value="Ethereum - ETH">
              Ethereum - ETH
            </option>
          </select>
          {/* Caret down icon */}
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <AiFillCaretDown className="w-6 h-6 text-[#499eb3]" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CryptoSelector;
