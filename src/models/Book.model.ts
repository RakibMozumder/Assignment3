import mongoose, { Document, Model, Schema } from "mongoose";
import { AppError } from "../utils/appError";
export interface IBook extends Document {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  updateAvailability(): void;
}
interface BookModel extends Model<IBook> {
  decreaseCopies(bookId: string, quantity: number): Promise<void>;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

bookSchema.statics.decreaseCopies = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
  if (!book) throw new AppError("Book not found", 404);
  if (book.copies < quantity)
    throw new AppError("Not enough copies available", 400);

  book.copies -= quantity;
  book.updateAvailability(); // instance method
  await book.save();
};
export const Book: BookModel = mongoose.model<IBook, BookModel>(
  "Book",
  bookSchema
);
