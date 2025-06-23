import mongoose, { Document, Schema } from "mongoose";
import { Book } from "./Book.model";

export interface IBorrow extends Document {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

borrowSchema.pre("save", async function (next) {
  const book = await Book.findById(this.book);
  if (!book) throw new Error("Book not found");
  if (book.copies < this.quantity)
    throw new Error("Not enough copies available");
  book.copies -= this.quantity;
  book.updateAvailability();
  await book.save();
  next();
});

borrowSchema.pre('save', async function (next) {
    try {
      await Book.decreaseCopies(this.book.toString(), this.quantity);
      next();
    } catch (err: any) {
      next(err);
    }
  });
export const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);
