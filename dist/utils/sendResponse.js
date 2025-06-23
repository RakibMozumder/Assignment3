"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, { success, message, data, statusCode = 200 }) => {
    res.status(statusCode).json({ success, message, data });
};
exports.sendResponse = sendResponse;
