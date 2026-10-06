import config from "../config/config.ts";

/** Test console logging when in development mode */
export const consoleTest = (message) => {
  if (config.NODE_ENV === "development") {
    console.log(message);
  }
};
