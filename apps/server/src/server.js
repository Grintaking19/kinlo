import config from "./config/config.js";
import prisma from "./config/db.js";
import app from "./app.js";

const PORT = config.PORT || 3000;

app.get("/health", async (req, res) => {
  await prisma.$queryRaw`SELECT 1`; // Check database connectivity
  res.status(200).json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
