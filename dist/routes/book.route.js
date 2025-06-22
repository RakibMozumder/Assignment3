"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
// src/routes/book.route.ts
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post("/", book_controller_1.createBook); // POST /api/books
exports.bookRoutes.get("/", book_controller_1.getAllBooks); // GET /api/books
exports.bookRoutes.get("/:bookId", book_controller_1.getBookById); // GET /api/books/:bookId
exports.bookRoutes.put("/:bookId", book_controller_1.updateBook); // PUT /api/books/:bookId
exports.bookRoutes.delete("/:bookId", book_controller_1.deleteBook); // DELETE /api/books/:bookId
