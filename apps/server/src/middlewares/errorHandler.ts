import config from "../config/config.js";
import type { Request, Response, NextFunction } from "express";
import type { AppError } from "../lib/errors/AppError.js";

const errorHandler = (
  err: Error & Partial<AppError>,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Set default values for statusCode and status if they are not already set
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.isOperational =
    err.isOperational !== undefined ? err.isOperational : false;

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
