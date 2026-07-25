import express from "express";
import dotenv from "dotenv";
import config from "./config.js";

const app = express();
const PORT = config.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
