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
    res.send(`...`);
});
app.use("/api/books", book_route_1.bookRoutes);
app.use("/api/borrow", borrow_route_1.borrowRoutes);
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/libraryDB";
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: { path: req.originalUrl },
    });
});
app.use(error_middleware_1.errorHandler);
exports.default = app;
