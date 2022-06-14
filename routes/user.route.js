const userController = require("../controllers/user.controller");
const router = require("express").Router({ mergeParams: true });

// get all users
router.route("/").get(userController.getUsers);

// create a new user
router.route("/register").post(userController.registerUser);

// login a user
router.route("/login").post(userController.loginUser);

module.exports = router;
