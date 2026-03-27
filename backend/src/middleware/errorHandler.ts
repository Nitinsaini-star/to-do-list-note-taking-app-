import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { ...error, statusCode: 404, message, isOperational: true };
  }

  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { ...error, statusCode: 400, message, isOperational: true };
  }

  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors).map((val: any) => val.message).join(', ');
    error = { ...error, statusCode: 400, message, isOperational: true };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);
