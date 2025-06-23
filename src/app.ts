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
  res.send(`...`);
});

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/libraryDB";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: { path: req.originalUrl },
  });
});

app.use(errorHandler as ErrorRequestHandler);
export default app;
