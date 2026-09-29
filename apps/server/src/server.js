import config from "./config/config.ts";
import app from "./app.js";
import ngrok from "@ngrok/ngrok";

const PORT = config.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  if (config.NODE_ENV === "development") {
    try {
      console.log(`Establishing Ngrok tunnel...`);
      const url = await ngrok.forward({
        addr: PORT,
        authtoken_from_env: true,
      });
      console.log(`Ngrok tunnel established at: ${url}`);
    } catch (error) {
      console.error("Error establishing Ngrok tunnel:", error);
    }
  }
});
