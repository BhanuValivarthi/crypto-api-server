const cron = require("node-cron");
const storeCryptoStats = require("./services/storeCryptoStats.js");

cron.schedule("*/15 * * * *", async () => {
  console.log("Calling Storecryptostats function");
  const coins = ["bitcoin", "ethereum", "matic-network"];
   for (const coin of coins) {
      await storeCryptoStats(coin);
   }
});

