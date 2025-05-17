const axios = require("axios");

const storeCryptoStats = async (coin) => {
  
  try{
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        ids: coin 
      }
    }
  );

  
  const data = response.data[0];

  
  return {
    coinType: data.id,
    price: data.current_price,
    marketCap: data.market_cap,
    change24h: data.price_change_percentage_24h
  };
}
catch(e){
   console.error("Error is",e.message);
}
};

module.exports = storeCryptoStats;
