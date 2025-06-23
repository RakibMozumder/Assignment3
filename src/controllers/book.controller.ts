import { NextFunction, Request, Response } from "express";
import { Book } from "../models/Book.model";
import { AppError } from "../utils/appError";
import { sendResponse } from "../utils/sendResponse";
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.create(req.body);
    sendResponse(res, {
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = 10,
    } = req.query;
    const query: any = filter ? { genre: filter } : {};
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(Number(limit));
    sendResponse(res, {
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) throw new Error("Book not found");
    sendResponse(res, {
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });
    if (!book) throw new Error("Book not found");
    sendResponse(res, {
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    sendResponse(res, {
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
if (!Book) throw new AppError("Book not found", 404);
