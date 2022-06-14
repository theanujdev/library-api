const jwt = require("jsonwebtoken");
const Users = require("../models/user.model");

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Not authenticated");
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Not authenticated");
    req.user = user;
    next();
  });
};

const isTeacher = async (req, res, next) => {
  // find user by email
  const user = await Users.findOne({ email: req.user.email });
  if (user && user.isTeacher) {
    req.user = user;
    return next();
  }
  return res.status(403).send("Not authorized");
};

const isStudent = async (req, res, next) => {
  // find user by email
  const user = await Users.findOne({ email: req.user.email });
  if (user && !user.isTeacher) {
    req.userId = user._id;
    return next();
  }
  return res.status(403).send("Not authorized");
};

module.exports = { isAuthenticated, isTeacher, isStudent };
