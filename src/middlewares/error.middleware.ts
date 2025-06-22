import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = {
    message: err.message || "Something went wrong",
    success: false,
    error: err,
  };
  res.status(500).json(error);
}
