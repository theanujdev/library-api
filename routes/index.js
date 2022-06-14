const userRoute = require("./user.route");
const bookRoute = require("./book.route");
const middleware = require("../middleware");
const Books = require("../models/book.model");
// const rentRoute = require("./rent.route");

const router = require("express").Router();

router.use("/books", bookRoute);

router.use(
  "/issue/:id",
  middleware.isAuthenticated,
  middleware.isStudent,
  (req, res, next) => {
    // put user id in book issuedBy field
    Books.findByIdAndUpdate(
      req.params.id,
      { issuedBy: req.userId },
      (err, book) => {
        if (err) {
          return next(err);
        }
        return res.json(book);
      }
    );
  }
);

router.use("/:user", userRoute);

module.exports = router;
