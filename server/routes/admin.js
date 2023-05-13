const express = require("express");
const AdminController = require("../controllers/admin");
const UserController = require("../controllers/user");
const adminRouter = express.Router();
const { adminAuthentication } = require("../middlewares/authentication");
const RideController = require("../controllers/ride");

adminRouter.post("/register", AdminController.adminRegister);
adminRouter.post("/login", AdminController.adminLogin);

adminRouter.use(adminAuthentication);

//* get all users
adminRouter.get("/users", UserController.getAllUsers);

//* get user by id
adminRouter.get("/users/:id", UserController.getUserById);

//* edit user status
adminRouter.patch("/users/:userId", UserController.changeUserStatus);

//* get rides
adminRouter.get("/rides", RideController.getAllRide);

//* delete ride
adminRouter.delete("/rides/:id", RideController.deleteRide);

module.exports = adminRouter;
