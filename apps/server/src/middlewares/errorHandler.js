import config from "../config/config.ts";

const errorHandler = (err, req, res, next) => {
  // Set default values for statusCode and status if they are not already set
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (config.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }
  // In production, we don't leak error details
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational ? err.message : "An unexpected error occurred.",
  });
};

export default errorHandler;
