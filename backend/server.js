const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
// const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");

const app = express();

// Middleware (must call the next function to give the next func to run)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://hawkhacks2024-mern-task-app.onrender.com",
    ],
  })
); // necessary for the frontend to share resources with the backend
app.use("/api/tasks/", taskRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
