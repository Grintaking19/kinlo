import config from "./config/config.ts";
import app from "./app.js";
import ngrok from "@ngrok/ngrok";

const PORT = config.PORT || 3000;
let ngrokListener;

const server = app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  if (config.NODE_ENV === "development") {
    try {
      console.log(`Establishing Ngrok tunnel...`);
      ngrokListener = await ngrok.forward({
        addr: PORT,
        authtoken_from_env: true,
      });
      console.log(`Ngrok tunnel established at: ${ngrokListener.url()}`);
    } catch (error) {
      console.error("Error establishing Ngrok tunnel:", error);
    }
  }
});

const shutdown = async (signal) => {
  console.log(`Received ${signal}, shutting down...`);
  if (ngrokListener) {
    await ngrok.disconnect(ngrokListener.url());
  }
  await ngrok.kill();
  server.close(() => process.exit(0));
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
process.once("SIGUSR2", shutdown);
