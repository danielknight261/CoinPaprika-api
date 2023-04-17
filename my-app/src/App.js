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
      <div className="bg-white w-80 h-160 rounded-lg shadow-lg p-4">
        {/* Add a form to select crypto currency */}
        <form>
          <label htmlFor="crypto" className="text-gray-600 font-semibold">
            Crypto Currency
          </label>
          <select
            id="crypto"
            name="crypto"
            onChange={handleCryptoChange}
            className="w-full outline outline-blue-600 mt-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
          </select>
        </form>

        {/* Currency tabs */}
        <div className="flex mt-4">
          <button
            className={`flex-1 px-4 py-2 text-center text-sm font-semibold focus:outline-none ${
              selectedCurrency === "USD"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => handleCurrencyClick("USD")}
          >
            USD
          </button>
          <button
            className={`flex-1 px-4 py-2 text-center text-sm font-semibold focus:outline-none ${
              selectedCurrency === "GBP"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => handleCurrencyClick("GBP")}
          >
            GBP
          </button>
        </div>

        {/* Display the data based on the selected crypto and currency */}
        <div className="mt-4">
          <p>
            {selectedCrypto} and {selectedCurrency}: {displayData()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;