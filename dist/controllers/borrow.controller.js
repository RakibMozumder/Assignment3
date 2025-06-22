"use strict";
// In borrow.controller.ts
const summary = await Borrow.aggregate([
    {
        $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
        },
    },
    {
        $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "bookInfo",
        },
    },
    {
        $unwind: "$bookInfo",
    },
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
