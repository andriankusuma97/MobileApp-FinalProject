const express = require("express");
const userRouter = require("./user");
const rideRouter = require("./ride");
const { userAuthentication } = require("../middlewares/authentication");
const mainRouter = express.Router();
const adminRouter = require("./admin");
const vehicleRouter = require("./vehicle");

mainRouter.use("/users", userRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use(userAuthentication);
mainRouter.use("/rides", rideRouter);
mainRouter.use("/vehicles", vehicleRouter);

module.exports = mainRouter;
