export class AppError extends Error {
  public statusCode: number;
  public error: any;

  constructor(message: string, statusCode = 400, error: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }
}
