const Books = require("../models/book.model");
const createError = require("http-errors");

const bookController = {
  getBooks: async (req, res, next) => {
    try {
      // get all books
      const books = await Books.find({});

      return res.json(books);
    } catch (err) {
      return next(err);
    }
  },
  addBook: async (req, res, next) => {
    try {
      const { title, description, author } = req.body;
      if (!title || !description || !author) {
        return next(createError(400, "Missing required fields"));
      }

      // check if book already exists
      const book = await Books.findOne({ title });
      if (book) {
        return next(createError(409, "Book already exists"));
      }

      // create new book
      Books.create({ title, description, author }, (err, book) => {
        if (err) {
          return next(err);
        }
        return res.json(book);
      });
    } catch (err) {
      return next(err);
    }
  },
  updateBook: async (req, res, next) => {
    const { title, description, author } = req.body;
    try {
      Books.findByIdAndUpdate(
        req.params.id,
        { title, description, author },
        (err, book) => {
          if (err) {
            return next(err);
          }
          return res.json(book);
        }
      );
    } catch (err) {
      if (err.name === "CastError")
        return next(createError(404, "Invalid book id"));
      return next(err);
    }
  },
  deleteBook: async (req, res, next) => {
    try {
      Books.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) {
          return next(err);
        }
        if (!book) {
          return next(createError(404, "Book not found"));
        }
        return res.json(book);
      });
    } catch (err) {
      if (err.name === "CastError")
        return next(createError(404, "Invalid book id"));
      return next(err);
    }
  },
  getBook: async (req, res, next) => {
    try {
      const book = await Books.findOne({ _id: req.params.id });
      if (!book) {
        return next(createError(404, "Book not found"));
      }
      return res.json(book);
    } catch (err) {
      if (err.name === "CastError")
        return next(createError(404, "Invalid book id"));
      return next(err);
    }
  },
};

module.exports = bookController;
