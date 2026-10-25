import config from "../config/config.js";


/** Test console logging when in development mode */
export const consoleTest = (message: string) => {
  if (config.NODE_ENV === "development") {
    console.log(message);
  }
};
