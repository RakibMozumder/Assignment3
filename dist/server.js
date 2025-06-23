"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
dotenv_1.default.config();
(0, db_1.connectDB)();
exports.default = app_1.default;
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app_1.default.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
