import cors from "cors";
import dotenv from "dotenv";
import express, {
  Application,
  ErrorRequestHandler,
  Request,
  Response,
} from "express";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/error.middleware";
import { bookRoutes } from "./routes/book.route";
import { borrowRoutes } from "./routes/borrow.route";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
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

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: { path: req.originalUrl },
  });
});

app.use(errorHandler as ErrorRequestHandler);
if (!mongoose.connection.readyState) {
  const mongoURI =
    process.env.MONGO_URI || "mongodb://localhost:27017/libraryDB";

  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("MongoDB connection error:", err));
}
export default app;
