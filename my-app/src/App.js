import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

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
        axios.get(apiUrlEthGbp)
      ])
      .then(
        axios.spread((responseBtcUsd, responseBtcGbp, responseEthUsd, responseEthGbp) => {
          // Access the relevant data from the responses for Bitcoin and Ethereum in USD and GBP
          const btcDataUsd = responseBtcUsd.data;
          const btcDataGbp = responseBtcGbp.data;
          const ethDataUsd = responseEthUsd.data;
          const ethDataGbp = responseEthGbp.data;

          // Set the fetched data to the state using setData()
          setData({ btcDataUsd, btcDataGbp, ethDataUsd, ethDataGbp });
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if(!data) return null

  console.log(data);


  return (
    <div>
      <h1>GBP BitCoin: £{data.btcDataGbp.quotes.GBP.ath_price}</h1>
      <h1>GBP Ethereum: £{data.ethDataGbp.quotes.GBP.ath_price}</h1>
      <h1>USD BitCoin Value: ${data.btcDataUsd.quotes.USD.ath_price}</h1>
      <h1>USD Ethereum: ${data.ethDataUsd.quotes.USD.ath_price}</h1>
    </div>
    // JSX for your App component
    // ...
  );
}

export default App;
