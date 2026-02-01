import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return console.log("ℹ️ MongoDB already connected");

  const connections = [
    { name: "Atlas Default", uri: process.env.MONGO_URI_ATLAS_DEFAULT, prod: true },
    { name: "Atlas SRV", uri: process.env.MONGO_URI_SRV, prod: true },
   
    { name: "Direct (ISP Bypass)", uri: process.env.MONGO_URI_DIRECT, prod: false }
  ];

  for (const { name, uri, prod } of connections) {
    if (!uri || (process.env.NODE_ENV === "production" && !prod)) continue;

    try {
      console.log(`⏳ Trying: ${name}...`);
      
      await mongoose.connect(uri, { 
        serverSelectionTimeoutMS: 8000, // 8 Seconds ka time diya hai ab
        family: 4 
      });

      return console.log(`✅ Connected via: ${name}`);
    } catch (err) {
      console.log(`❌ ${name} failed (Timeout/Error).`);
    }
  }

  console.error("💥 All connection methods failed!");
  process.exit(1);
};

export default connectDB;