const express = require("express");
const vehicleRouter = express.Router();
const VehicleController = require("../controllers/vehicle");

vehicleRouter.post("/", VehicleController.createVehicle);
vehicleRouter.put("/:id", VehicleController.editVehicle);
vehicleRouter.delete("/:id", VehicleController.deleteVehicle);

module.exports = vehicleRouter;
