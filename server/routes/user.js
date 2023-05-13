const express = require("express");
const UserController = require("../controllers/user");
const { userAuthentication } = require("../middlewares/authentication");
const RideController = require("../controllers/ride");
const multiUpload = require("../middlewares/multer");
const upload = require("../middlewares/multer");
const userRouter = express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get(
  "/currentUser",
  userAuthentication,
  UserController.getCurrentUser
);
userRouter.get("/rides", userAuthentication, RideController.ridePerUser);
userRouter.patch("/rate/:id", userAuthentication, UserController.rateUser);

module.exports = userRouter;
