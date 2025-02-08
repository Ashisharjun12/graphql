import logger from "../utils/logger.js";
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

const errorHandler = (error, req, res, next) => {
  const errorId = uuidv4();
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const clientMessage = error.clientMessage || 'Internal Server Error';
  
  // Structured error logging
  logger.error({
    id: errorId,
    message: error.message,
    stack: error.stack,
    method: req.method,
    path: req.path,
    ip: req.ip,
    statusCode: statusCode,
    details: error.details || 'No additional details'
  });

  // Error response structure
  res.status(statusCode).json({
    error: {
      code: statusCode,
      type: error.name || 'UnhandledError',
      message: clientMessage,
      id: errorId,
      timestamp: new Date().toISOString(),
      documentation: `https://api.yourservice.com/docs/errors/${errorId}`,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
};

// Example custom error class for structured errors
export class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.clientMessage = message || 'Validation failed';
    this.details = details;
  }
}

export default errorHandler;