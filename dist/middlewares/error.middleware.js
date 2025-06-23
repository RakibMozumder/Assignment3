"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
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
exports.errorHandler = errorHandler;
