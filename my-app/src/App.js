import React, { useState, useEffect } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(""); // Initialize as an empty string
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleCryptoChange = (e) => {
    setSelectedCrypto(e.target.value);
  };

  const handleCurrencyClick = (currency) => {
    setSelectedCurrency(currency);
  };

  const fetchData = () => {
    const apiUrlBtcUsd =
      "https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=USD";
    const apiUrlBtcGbp =
      "https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=GBP";
    const apiUrlEthUsd =
      "https://api.coinpaprika.com/v1/tickers/eth-ethereum?quotes=USD";
    const apiUrlEthGbp =
      "https://api.coinpaprika.com/v1/tickers/eth-ethereum?quotes=GBP";

    axios
      .all([
        axios.get(apiUrlBtcUsd),
        axios.get(apiUrlBtcGbp),
        axios.get(apiUrlEthUsd),
        axios.get(apiUrlEthGbp),
      ])
      .then(
        axios.spread(
          (responseBtcUsd, responseBtcGbp, responseEthUsd, responseEthGbp) => {
            const btcDataUsd = responseBtcUsd.data;
            const btcDataGbp = responseBtcGbp.data;
            const ethDataUsd = responseEthUsd.data;
            const ethDataGbp = responseEthGbp.data;

            setData({ btcDataUsd, btcDataGbp, ethDataUsd, ethDataGbp });
          }
        )
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRefreshClick = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return null;

  const displayData = () => {
    let currencySymbol = selectedCurrency === "USD" ? "$" : "£";

    if (selectedCrypto === "Bitcoin - BTC" && selectedCurrency === "USD") {
      return currencySymbol + data.btcDataUsd.quotes.USD.price.toFixed(2);
    }
    if (selectedCrypto === "Bitcoin - BTC" && selectedCurrency === "GBP") {
      return currencySymbol + data.btcDataGbp.quotes.GBP.price.toFixed(2);
    }
    if (selectedCrypto === "Ethereum - ETH" && selectedCurrency === "USD") {
      return currencySymbol + data.ethDataUsd.quotes.USD.price.toFixed(2);
    }
    if (selectedCrypto === "Ethereum - ETH" && selectedCurrency === "GBP") {
      return currencySymbol + data.ethDataGbp.quotes.GBP.price.toFixed(2);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-gradient-to-b from-[#261c35] to-[#24325e] w-80 h-160 rounded-lg shadow-lg p-10">
        {/* Crypto Currency Selection Container */}
       <form>
          <select
            id="crypto"
            name="crypto"
            onChange={handleCryptoChange}
            className="w-full px-4 py-4  bg-opacity-0 text-[#499eb3] font-bold  rounded-3xl  text-lg border border-[#499eb3] "
          >
            <option value="" disabled selected>Select your crypto</option> {/* Add a default option */}
            <option className="font-bold" value="Bitcoin - BTC">Bitcoin - BTC</option>
            <option className="font-bold" value="Ethereum - ETH">Ethereum - ETH</option>
          </select>
        </form>

        {/* Data Display Container and Refresh Button */}
        <div className="relative mt-8  py-16 rounded-2xl bg-gradient-to-r from-[#f67a60] to-[#f59f9a]">
          {/* Refresh button */}
          <div className="absolute top-0 right-0 p-2">
            <button
              className="text-white focus:outline-none"
              onClick={handleRefreshClick}
            >
              <MdOutlineRefresh size={40} />
            </button>
          </div>
          {/* Display */}
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-white text-center w-full">
              {selectedCrypto}
              <p className="text-3xl font-bold text-white text-center w-full">
                {displayData()}
              </p>
            </p>
          </div>
        </div>

        {/* Currency tabs */}
        <div className="flex mt-8">
          <button
            className={`flex-1 px-4 py-4 text-center text-sm font-semibold focus:outline-none rounded-l-3xl  ${
              selectedCurrency === "USD"
                ? "bg-gradient-to-r from-[#546afc] to-[#36c6f9] text-white"
                : "border border-[#499eb3] text-[#499eb3]"
            }`}
            onClick={() => handleCurrencyClick("USD")}
          >
            USD
          </button>
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
      </div>
    </div>
  );
}

export default App;
