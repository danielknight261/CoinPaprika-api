import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState("Bitcoin");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleCryptoChange = (e) => {
    setSelectedCrypto(e.target.value);
  };

  const handleCurrencyClick = (currency) => {
    setSelectedCurrency(currency);
  };
  

  useEffect(() => {
    const apiUrlBtcUsd =
      "https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=USD";
    const apiUrlBtcGbp =
      "https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=GBP";
    const apiUrlEthUsd =
      "https://api.coinpaprika.com/v1/tickers/eth-ethereum?quotes=USD";
    const apiUrlEthGbp =
      "https://api.coinpaprika.com/v1/tickers/eth-ethereum?quotes=GBP";

    // Use Axios to make multiple GET requests using axios.all() and axios.spread()
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
            // Access the relevant data from the responses for Bitcoin and Ethereum in USD and GBP
            const btcDataUsd = responseBtcUsd.data;
            const btcDataGbp = responseBtcGbp.data;
            const ethDataUsd = responseEthUsd.data;
            const ethDataGbp = responseEthGbp.data;

            // Set the fetched data to the state using setData()
            setData({ btcDataUsd, btcDataGbp, ethDataUsd, ethDataGbp });
          }
        )
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!data) return null;

  console.log(data);

  const displayData = () => {
    if (selectedCrypto === "Bitcoin" && selectedCurrency === "USD") {
      return data.btcDataUsd.quotes.USD.price.toFixed(2);
    }
    if (selectedCrypto === "Bitcoin" && selectedCurrency === "GBP") {
      return data.btcDataGbp.quotes.GBP.price.toFixed(2);
    }
    if (selectedCrypto === "Ethereum" && selectedCurrency === "USD") {
      return data.ethDataUsd.quotes.USD.price.toFixed(2);
    }
    if (selectedCrypto === "Ethereum" && selectedCurrency === "GBP") {
      return data.ethDataGbp.quotes.GBP.price.toFixed(2);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-gradient-to-b from-[#261c35] to-[#24325e] w-80 h-160 rounded-lg shadow-lg p-10">
        {/* Add a form to select crypto currency */}
        <form>
         
          <select
            id="crypto"
            name="crypto"
            onChange={handleCryptoChange}
            className="w-full px-4 py-4 text-[#499eb3] outline outline-[#499eb3] rounded-3xl focus:ring-[#499eb3] focus:border-[#499eb3] text-lg "
          >
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
          </select>
        </form>

        {/* Display the data based on the selected crypto and currency */}
        <div className="flex mt-8 pl-2 px-60 py-4 rounded-2xl bg-gradient-to-r from-[#f67a60] to-[#f59f9a]">
        
          <p className="text-white">
            {selectedCrypto} and {selectedCurrency}: {displayData()}
          </p>
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