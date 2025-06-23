"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 400, error = null) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
