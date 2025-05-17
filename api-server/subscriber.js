// const redis = require("redis");
// const storeCryptoStats = require("./services/storeCryptoStats.js"); 

// const subscriber = redis.createClient();
// subscriber.connect();

// async function setupSubscriber() {
//   await subscriber.subscribe("crypto-update", async (message) => {
//     console.log("Received event:", message);

//     const coins = ["bitcoin", "ethereum", "matic-network"];
//     for (const coin of coins) {
//       await storeCryptoStats(coin);
//     }
//   });
// }

// module.exports = setupSubscriber;