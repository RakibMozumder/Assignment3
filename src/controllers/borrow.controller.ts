import { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/Borrow.model";
import { sendResponse } from "../utils/sendResponse";

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const record = await Borrow.create(req.body);
    sendResponse(res, {
      success: true,
      message: "Book borrowed successfully",
      data: record,
    });
  } catch (err) {
    next(err);
  }
};

export const getBorrowedSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const summary = await Borrow.aggregate([
      { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    sendResponse(res, {
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (err) {
    next(err);
  }
};
