const express = require("express");
const app = express();
const port = 8000;

const { default: mongoose } = require("mongoose");
const CryptoCollection = require("./models/cryptoCollection.js");
const storeCryptoStats = require("./services/storeCryptoStats.js");

// const setupSubscriber = require("./subscriber");
// setupSubscriber();
require("./schedule.js");



main()
.then(() => console.log("connected to DB"))
.catch(err => console.log(err));

async function main(){
  await mongoose.connect('mongodb+srv://bhanu2003:05uSk7WG15Vr9guA@cluster0.ttnpyg5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

app.get("/stats",async(req,res)=>{
   const {coin} = req.query;
   let data;
   try{
      if(coin == "bitcoin" || coin == "ethereum" || coin =="matic-network"){
        data = await  storeCryptoStats(coin);
      }
      else{
        res.status(404).json({message:"please enter valid name "});
      }
   }
   catch(e){
     console.error(err.message);
     res.status(404).json({message:"Error in fetching api"});
   } 

     const cryptoData  = new CryptoCollection(data);
     await cryptoData.save();

     res.send(data);
})

app.get("/deviation", async (req, res) => {
  let { coin } = req.query;

  try {
    if (coin === "bitcoin" || coin === "ethereum" || coin === "matic-network") {
      const records = await CryptoCollection.find({ coinType: coin })
        .sort({ _id: -1 })
        .limit(100);

      const prices = records.map(record => record.price);

      if (prices.length === 0) {
        return res.status(404).json({ message: "No records found" });
      }

      const n = prices.length;
      const mean = prices.reduce((a, b) => a + b, 0) / n;
      const variance =
        prices.map(p => Math.pow(p - mean, 2)).reduce((a, b) => a + b, 0) / n;
      const stdDeviation = Math.sqrt(variance);

      res.json({ deviation: stdDeviation });
    } else {
      res.status(400).json({ message: "Invalid coin name" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error calculating deviation" });
  }
});



app.listen(port,()=>{
  console.log(`app is listening ${port}`);
})