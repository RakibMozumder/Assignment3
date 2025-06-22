"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    const error = {
        message: err.message || 'Something went wrong',
        success: false,
        error: err
    };
    res.status(500).json(error);
}
