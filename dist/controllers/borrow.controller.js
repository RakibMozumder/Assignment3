"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedSummary = exports.borrowBook = void 0;
const Borrow_model_1 = require("../models/Borrow.model");
const sendResponse_1 = require("../utils/sendResponse");
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = yield Borrow_model_1.Borrow.create(req.body);
        (0, sendResponse_1.sendResponse)(res, { success: true, message: 'Book borrowed successfully', data: record });
    }
    catch (err) {
        next(err);
    }
});
exports.borrowBook = borrowBook;
const getBorrowedSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield Borrow_model_1.Borrow.aggregate([
            { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            { $unwind: '$bookInfo' },
            {
                $project: {
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);
        (0, sendResponse_1.sendResponse)(res, { success: true, message: 'Borrowed books summary retrieved successfully', data: summary });
    }
    catch (err) {
        next(err);
    }
});
exports.getBorrowedSummary = getBorrowedSummary;
