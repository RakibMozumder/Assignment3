"use strict";
// In book.controller.ts
const genre = req.query.filter;
const sortBy = req.query.sortBy || "createdAt";
const sort = req.query.sort === "desc" ? -1 : 1;
const limit = parseInt(req.query.limit) || 10;
const books = await Book.find(genre ? { genre } : {})
    .sort({ [sortBy]: sort })
    .limit(limit);
