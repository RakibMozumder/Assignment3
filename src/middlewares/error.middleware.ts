import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 400;

  if (err.name === 'ValidationError') {
    return res.status(statusCode).json({
      message: 'Validation failed',
      success: false,
      error: err
    });
  }

  res.status(statusCode).json({
    message: err.message || 'Something went wrong',
    success: false,
    error: err.error || err
  });
};
