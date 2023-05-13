const { Ride } = require("../models");

const userAuthorization = async (req, res, next) => {
  try {
    const rideId = req.params.id;
    const userId = req.user.id;

    const ride = await Ride.findByPk(rideId);

    if (!ride) {
      throw { name: "not_found" };
    }

    if (ride.createdBy !== userId) {
      throw { name: "invalid_token" };
    }

    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = userAuthorization;
