require("dotenv").config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

// require("dotenv").config();
const mongoose = require("mongoose")

// // rZAwa3mCUMgrnnRj
mongoose.connect("mongodb+srv://rohitthakur792002_db_user:rZAwa3mCUMgrnnRj@cluster0.7hhtnwm.mongodb.net/RentalProject?appName=Cluster0")
.then(()=>{
    console.log("Connected to database")
})
.catch((err)=>{
    console.log("Couldn't connect to database")
    console.error(err);
})

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGODB_URI;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("RentalProject").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);