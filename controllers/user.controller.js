const Users = require("../models/user.model");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  getUsers: async (req, res, next) => {
    try {
      let users;
      // find by name if it is provided
      if (req.query.name) {
        users = await Users.find({ name: req.query.name }).select(
          "name email isTeacher"
        );
      } else if (req.params.user === "students") {
        // get all students
        users = await Users.find({ isTeacher: false }).select(
          "name email isTeacher"
        );
      } else {
        // get all teachers
        users = await Users.find({ isTeacher: true }).select(
          "name email isTeacher"
        );
      }
      return res.json(users);
    } catch (err) {
      return next(err);
    }
  },
  registerUser: async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(createError(400, "Missing required fields"));
    }

    // check if user already exists
    const user = await Users.findOne({ email });
    if (user) {
      return next(createError(409, "Account already exists"));
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    if (req.params.user === "students") {
      Users.create(
        { name, email, password: hashedPassword, isTeacher: false },
        (err, user) => {
          if (err) {
            return next(err);
          }
          return res.json(user);
        }
      );
    } else {
      Users.create(
        { name, email, password: hashedPassword, isTeacher: true },
        (err, user) => {
          if (err) {
            return next(err);
          }
          const { name, email, isTeacher } = user;
          return res.json({ name, email, isTeacher });
        }
      );
    }
  },

  loginUser: async (req, res, next) => {
    const { email, password } = req.body;

    //check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
      return next(createError(404, "Account doesn't exists"));
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(401, "Invalid password"));
    }

    // create token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { name, isTeacher } = user;
    return res.json({ user: { name, email, isTeacher }, token });
  },
};

module.exports = userController;
