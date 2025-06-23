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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const Book_model_1 = require("../models/Book.model");
const appError_1 = require("../utils/appError");
const sendResponse_1 = require("../utils/sendResponse");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_model_1.Book.create(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = 10, } = req.query;
        const query = filter ? { genre: filter } : {};
        const books = yield Book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === "desc" ? -1 : 1 })
            .limit(Number(limit));
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_model_1.Book.findById(req.params.bookId);
        if (!book)
            throw new Error("Book not found");
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
        });
        if (!book)
            throw new Error("Book not found");
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Book_model_1.Book.findByIdAndDelete(req.params.bookId);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteBook = deleteBook;
if (!Book_model_1.Book)
    throw new appError_1.AppError("Book not found", 404);
