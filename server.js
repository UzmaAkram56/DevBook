const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
require("dotenv").config();
const app = express();

// Serve static files from "storage" folder
app.use("/storage", express.static(path.join(__dirname, "storage")));

// Connect to Database
connectDB();

// Initialize Middleware
app.use(express.json({ strict: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// Serve Static assets in production
if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
