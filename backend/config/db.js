const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });
    console.log("Mongo DB connected");
  } catch (err) {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectMongo;
