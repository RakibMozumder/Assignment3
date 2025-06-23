"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_middleware_1 = require("./middlewares/error.middleware");
const book_route_1 = require("./routes/book.route");
const borrow_route_1 = require("./routes/borrow.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send(`
    <h1>Library Management System API</h1>
    <p>Welcome! This is an API built with Express, TypeScript, and MongoDB.</p>
    <ul>
      <li><code>POST /api/books</code> — Create a Book</li>
      <li><code>GET /api/books</code> — Get All Books</li>
      <li><code>GET /api/books/:id</code> — Get Book by ID</li>
      <li><code>PUT /api/books/:id</code> — Update Book</li>
      <li><code>DELETE /api/books/:id</code> — Delete Book</li>
      <li><code>POST /api/borrow</code> — Borrow a Book</li>
      <li><code>GET /api/borrow</code> — Borrowed Books Summary</li>
    </ul>
  `);
});
app.use("/api/books", book_route_1.bookRoutes);
app.use("/api/borrow", borrow_route_1.borrowRoutes);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: { path: req.originalUrl },
    });
});
app.use(error_middleware_1.errorHandler);
if (!mongoose_1.default.connection.readyState) {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/libraryDB";
    mongoose_1.default
        .connect(mongoURI)
        .then(() => console.log("MongoDB connected!"))
        .catch((err) => console.error("MongoDB connection error:", err));
}
exports.default = app;
