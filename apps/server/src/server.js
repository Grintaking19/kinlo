import config from "./config/config.js";
import app from "./app.js";

const PORT = config.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
