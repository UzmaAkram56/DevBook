const mongoose = require("mongoose");
require("dotenv").config();

// Connection to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("error", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
