import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoSelector from "./components/CryptoSelector";
import DataDisplay from "./components/DataDisplay";
import CurrencyTabs from "./components/CurrencyTabs";

function App() {
  // Declare state variables
  const [data, setData] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  
  // Fetch data from Coinpaprika API
  const fetchData = () => {
    // Define API endpoints
    const apiUrlBtcUsd =
      "https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=USD";
    const apiUrlBtcGbp =
      "https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=GBP";
    const apiUrlEthUsd =
      "https://api.coinpaprika.com/v1/tickers/eth-ethereum?quotes=USD";
    const apiUrlEthGbp =
      "https://api.coinpaprika.com/v1/tickers/eth-ethereum?quotes=GBP";

    // Perform API requests and set data state
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

  // Refresh data on button click
  const handleRefreshClick = () => {
    fetchData();
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // If no data, return null
  if (!data) return null;

  // Determine the data to display based on selected crypto and currency
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

 // Render the application
 return (
  <div className="flex justify-center items-center min-h-screen bg-gray-200">
    <div className="bg-gradient-to-b from-[#261c35] to-[#24325e] w-80 h-160 rounded-lg shadow-lg p-10">
      <CryptoSelector
        selectedCrypto={selectedCrypto}
        onCryptoChange={setSelectedCrypto}
      />
      <DataDisplay
        selectedCrypto={selectedCrypto}
        displayData={displayData()}
        onRefreshClick={handleRefreshClick}
      />
      <CurrencyTabs
        selectedCurrency={selectedCurrency}
        onCurrencyClick={setSelectedCurrency}
      />
    </div>
  </div>
);
}

export default App;