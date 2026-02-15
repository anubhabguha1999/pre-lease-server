const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/pre-lease-logs";

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const closeMongo = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed gracefully");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
};

module.exports = { connectMongo, closeMongo };
