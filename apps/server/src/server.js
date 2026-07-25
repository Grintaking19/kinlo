import express from "express";
import config from "./config.js";
import cors from "cors";


const app = express();
const PORT = config.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());



app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
