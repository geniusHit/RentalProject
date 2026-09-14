// require("dotenv").config();
// const dns = require('dns');
// dns.setServers(['8.8.8.8', '1.1.1.1']);

// const mongoose = require("mongoose")

// // // rZAwa3mCUMgrnnRj
// mongoose.connect("mongodb+srv://rohitthakur792002_db_user:rZAwa3mCUMgrnnRj@cluster0.7hhtnwm.mongodb.net/RentalProject?appName=Cluster0")
// .then(()=>{
//     console.log("Connected to database")
// })
// .catch((err)=>{
//     console.log("Couldn't connect to database")
//     console.error(err);
// })





require("dotenv").config();
const mongoose = require("mongoose");

// Prevent connection thrashing across warm serverless function invocations
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("Connected to MongoDB");
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null; // Reset so subsequent requests can retry
        console.error("Failed to connect to MongoDB:", err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;