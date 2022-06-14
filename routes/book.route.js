const bookController = require("../controllers/book.controller");
const middleware = require("../middleware");
const router = require("express").Router();

// get all books
router
  .route("/")
  .get(bookController.getBooks)
  .post(
    middleware.isAuthenticated,
    middleware.isTeacher,
    bookController.addBook
  ); // add a new book

router
  .route("/:id")
  .get(bookController.getBook) // get a book by id
  .put(
    middleware.isAuthenticated,
    middleware.isTeacher,
    bookController.updateBook
  ) // update a book by id
  .delete(
    middleware.isAuthenticated,
    middleware.isTeacher,
    bookController.deleteBook
  ); // delete a book by id

module.exports = router;
