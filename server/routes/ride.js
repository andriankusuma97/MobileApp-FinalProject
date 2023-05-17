const express = require("express");
const RideController = require("../controllers/ride");
const rideRouter = express.Router();
const userAuthorization = require("../middlewares/authorization");

rideRouter.get("/", RideController.getAllRide);
rideRouter.post("/", RideController.createRide);
rideRouter.get("/requests", RideController.getRequests);
rideRouter.delete("/:id", userAuthorization, RideController.deleteRide);
rideRouter.get("/:id", RideController.getRideById);
rideRouter.put("/:id", userAuthorization, RideController.updateRide);
rideRouter.post("/generate-midtrans-token/:id", RideController.genMidtransToken);
rideRouter.post("/order/:id", RideController.orderRide);
rideRouter.delete("/order/:id", RideController.cancelOrder);
rideRouter.patch("/order/:id", RideController.changeStatusOrder);

module.exports = rideRouter;
