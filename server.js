const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const morgan = require("morgan");
// const path = require("path");
// const fs = require("fs");
const { PORT } = require("./config/config");

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB.");
  })
  .catch((err) => {
    console.log("DB error : ", err);
  });

// logging
if (process.env.NODE_ENV === "production") {
  //   const accessLogStream = fs.createWriteStream(
  //     path.join(__dirname, "access.log"),
  //     {
  //       flags: "a",
  //     }
  //   );
  //   app.use(morgan("combined", { stream: accessLogStream }));
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("Server is up!");
});

// all api routes
app.use("/api", require("./routes"));

// catch 404
app.use((req, res, next) => {
  next(createError.NotFound());
});

// catch errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
