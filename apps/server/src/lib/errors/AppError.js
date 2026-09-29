class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // Marking this error as operational, meaning it is a known error that can be handled gracefully
    this.isOperational = true;

    // This is to capture the stack trace and exclude the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation failed", statusCode = 422) {
    super(message, statusCode);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found", statusCode = 404) {
    super(message, statusCode);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access", statusCode = 401) {
    super(message, statusCode);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Forbidden access", statusCode = 403) {
    super(message, statusCode);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad request", statusCode = 400) {
    super(message, statusCode);
  }
}

class UnauthenticatedError extends AppError {
  constructor(message = "Unauthenticated access", statusCode = 407) {
    super(message, statusCode);
  }
}

class ConflictError extends AppError {
  constructor(message = "Conflict occurred", statusCode = 409) {
    super(message, statusCode);
  }
}

class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests", statusCode = 429) {
    super(message, statusCode);
  }
}

class InternalServerError extends AppError {
  constructor(message = "Internal server error", statusCode = 500) {
    super(message, statusCode);
  }
}

export {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
  UnauthenticatedError,
  ConflictError,
  TooManyRequestsError,
  InternalServerError,
};
