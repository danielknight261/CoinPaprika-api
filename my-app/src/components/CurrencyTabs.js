import React from "react";

// CurrencyTabs component with selectedCurrency and onCurrencyClick passed as props
function CurrencyTabs({ selectedCurrency, onCurrencyClick }) {
  // Function to handle clicks on currency tabs
  const handleCurrencyClick = (currency) => {
    onCurrencyClick(currency);
  };

  // Render the CurrencyTabs component
  return (
    <div className="flex mt-8">
      {/* Button for selecting USD currency */}
      <button
        className={`flex-1 px-4 py-4 text-center text-sm font-semibold focus:outline-none rounded-l-3xl ${
          selectedCurrency === "USD"
            ? "bg-gradient-to-r from-[#546afc] to-[#36c6f9] text-white"
            : "border border-[#499eb3] text-[#499eb3]"
        }`}
        onClick={() => handleCurrencyClick("USD")}
      >
        USD
      </button>
      {/* Button for selecting GBP currency */}
      <button
        className={`flex-1 px-4 py-4 text-center text-sm font-semibold focus:outline-none rounded-r-3xl ${
          selectedCurrency === "GBP"
            ? "bg-gradient-to-r from-[#36c6f9] to-[#546afc] text-white"
            : "border border-[#499eb3] text-[#499eb3]"
        }`}
        onClick={() => handleCurrencyClick("GBP")}
      >
        GBP
      </button>
    </div>
  );
}

export default CurrencyTabs;
