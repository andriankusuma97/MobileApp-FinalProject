const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const Hash = require("../helpers/bcrypt");

let user1 = {
  name: "Test User 1",
  email: "testuser1@mail.com",
  password: "password",
  phoneNumber: "81324759",
  photo: "https://example-photo.com",
  idCardImg: "https://example-id.com",
};

let userLogin = {
  email: "andisusanto@contoh.com",
  password: "sandikupassword",
};

let access_token = "";

beforeAll(async () => {
  await sequelize.queryInterface.bulkDelete(
    "Admins",
    {},
    { truncate: true, cascade: true, restartIdentity: true }
  );
  try {
    // seed users
    await sequelize.queryInterface.bulkInsert(
      "Users",
      require("../db/user.json").map((el) => {
        el.createdAt = new Date();
        el.updatedAt = new Date();
        el.password = Hash.create(el.password);
        return el;
      })
    );
    // seed vehicles
    await sequelize.queryInterface.bulkInsert(
      "Vehicles",
      require("../db/vehicle.json").map((el) => {
        el.createdAt = new Date();
        el.updatedAt = new Date();
        return el;
      })
    );
    // seed rides
    await sequelize.queryInterface.bulkInsert(
      "Rides",
      require("../db/ride.json").map((el) => {
        el.createdAt = new Date();
        el.updatedAt = new Date();
        return el;
      })
    );
    // seed userRides
    await sequelize.queryInterface.bulkInsert(
      "UserRides",
      require("../db/userRide.json").map((el) => {
        el.createdAt = new Date();
        el.updatedAt = new Date();
        return el;
      })
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete(
    "Admins",
    {},
    { truncate: true, cascade: true, restartIdentity: true }
  );
  await sequelize.queryInterface.bulkDelete(
    "UserRides",
    {},
    { truncate: true, cascade: true, restartIdentity: true }
  );
  await sequelize.queryInterface.bulkDelete(
    "Vehicles",
    {},
    { truncate: true, cascade: true, restartIdentity: true }
  );
  await sequelize.queryInterface.bulkDelete(
    "Admins",
    {},
    { truncate: true, cascade: true, restartIdentity: true }
  );
  await sequelize.queryInterface.bulkDelete(
    "Users",
    {},
    { truncate: true, cascade: true, restartIdentity: true }
  );
});

describe("POST /users/register", () => {
  describe("POST /users/register success", () => {
    it("should response with status 201 and return success message", async () => {
      const response = await request(app).post("/users/register").send(user1);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", expect.any(String));
      expect(response.body.message).toBe(
        "User Test User 1 has succesfully registered"
      );
    });
  });

  describe("POST /users/register fail", () => {
    it("should response with status 400 and return error message if email is null", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, email: null });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email is required");
    });

    it("should response with status 400 and return error message if password is null", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, password: null });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Password is required");
    });

    it("should response with status 400 and return error message if name is null", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, name: null });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Name is required");
    });

    it("should response with status 400 and return error message if phone number is null", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, phoneNumber: null });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Phone number is required");
    });

    it("should response with status 400 and return error message if photo is null", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, photo: null });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Photo is required");
    });

    it("should response with status 400 and return error message if ID-card image is null", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, idCardImg: null });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("ID card photo is required");
    });

    it("should response with status 400 and return error message if email is empty string", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, email: "" });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email is required");
    });

    it("should response with status 400 and return error message if password is empty string", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, password: "" });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Password minimum 5 characters");
    });

    it("should response with status 400 and return error message if name is empty string", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, name: "" });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Name is required");
    });

    it("should response with status 400 and return error message if phone number is empty string", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, phoneNumber: "" });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Phone number is required");
    });

    it("should response with status 400 and return error message if photo is empty string", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, photo: "" });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Photo is required");
    });

    it("should response with status 400 and return error message if ID-card image is empty string", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, idCardImg: "" });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("ID card photo is required");
    });

    it("should response with status 400 and return error message if email is registered", async () => {
      const response = await request(app).post("/users/register").send(user1);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Email is already used, please use another email"
      );
    });

    it("should response with status 400 and return error message if email format is invalid", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({ ...user1, email: "test@test" });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid email format");
    });
  });
});

describe("POST /users/login", () => {
  describe("POST /users/login success", () => {
    it("should response with status 200 and object containing access token and other dtails if login is success", async () => {
      const { status, body } = await request(app)
        .post("/users/login")
        .send(userLogin);
      expect(status).toBe(200);
      expect(body).toHaveProperty("access_token", expect.any(String));
      expect(body.name).toBe("Andi Susanto");
      expect(body.email).toBe("andisusanto@contoh.com");
      expect(body.phoneNumber).toBe("555-1234");
      expect(body).toHaveProperty("photo", expect.any(String));
      expect(body).toHaveProperty("rating", expect.any(Number));
      access_token = body.access_token;
    });
  });

  describe("POST /users/login fail", () => {
    it("should response with status 400 and error message if email is not given", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ ...userLogin, email: null });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email is required");
    });

    it("should response with status 400 and error message if password is not given", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ ...userLogin, password: null });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Password is required");
    });

    it("should response with status 401 and error message if wrong password is given", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ ...userLogin, password: "wrongpassword" });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Email / Password is wrong");
    });

    it("should response with status 401 and error message if unregistered email is given", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ ...userLogin, email: "unregisteredemail@mail.com" });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Email / Password is wrong");
    });
  });
});

describe("GET /users/rides", () => {
  describe("GET /users/rides success", () => {
    it("should response with status 200 and array of rides", async () => {
      const { status, body } = await request(app)
        .get("/users/rides")
        .set({ access_token: access_token });
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body[0]).toHaveProperty("id", expect.any(Number));
      expect(body[0]).toHaveProperty("UserId", expect.any(Number));
      expect(body[0]).toHaveProperty("RideId", expect.any(Number));
      expect(body[0]).toHaveProperty("status", expect.any(String));
      expect(body[0].Ride).toBeInstanceOf(Object);
      expect(body[0].Ride).toHaveProperty("id", expect.any(Number));
      expect(body[0].Ride).toHaveProperty("startLocation", expect.any(String));
      expect(body[0].Ride).toHaveProperty("destination", expect.any(String));
      expect(body[0].Ride).toHaveProperty("departureTime", expect.any(String));
      expect(body[0].Ride).toHaveProperty("arrivalTime", expect.any(String));
      expect(body[0].Ride).toHaveProperty("price", expect.any(Number));
      expect(body[0].Ride).toHaveProperty("seats", expect.any(Number));
      expect(body[0].Ride).toHaveProperty("createdBy", expect.any(Number));
      expect(body[0].Ride).toHaveProperty("VehicleId", expect.any(Number));
    });
  });

  describe("GET /users/rides fail", () => {
    it("should response with status 400 and error message if access token is not given", async () => {
      const { status, body } = await request(app).get("/users/rides");
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBe("Access Token Missing");
    });

    it("should response with status 403 and error message if access token is invalid", async () => {
      const { status, body } = await request(app)
        .get("/users/rides")
        .set({ access_token: "wrongaccesstoken" });
      expect(status).toBe(403);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBe("Forbidden");
    });
  });
});

describe("PATCH /users/rate/:id", () => {
  describe("PATCH /users/rate/:id success", () => {
    it("should response with status 200 and success message", async () => {
      const { status, body } = await request(app)
        .patch("/users/rate/2")
        .set({ access_token: access_token })
        .send({ rating: 5 });
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("PATCH /users/rate/:id fail", () => {
    it("should response with status 404 and error message if user with <userId> not found", async () => {
      const { status, body } = await request(app)
        .patch("/users/rate/100")
        .set({ access_token: access_token })
        .send({ rating: 5 });
      expect(status).toBe(404);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBe("Data not found");
    });

    it("should response with status 400 and error message if user rate themself", async () => {
      const { status, body } = await request(app)
        .patch("/users/rate/1")
        .set({ access_token: access_token })
        .send({ rating: 5 });
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBe("You cannot rate yourself");
    });

    it("should response with status 400 and error message if rating is above 5", async () => {
      const { status, body } = await request(app)
        .patch("/users/rate/2")
        .set({ access_token: access_token })
        .send({ rating: 10 });
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBe("Rating must be between 1-5");
    });

    it("should response with status 400 and error message if rating is not below 1", async () => {
      const { status, body } = await request(app)
        .patch("/users/rate/2")
        .set({ access_token: access_token })
        .send({ rating: 0 });
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBe("Rating must be between 1-5");
    });
  });
});

describe("GET /users/currentUser", () => {
  describe("GET /users/currentUser success", () => {
    it("should response with status 200 and data of currently logged in user", async () => {
      const { status, body } = await request(app)
        .get("/users/currentUser")
        .set({ access_token: access_token });
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body.id).toBe(1);
      expect(body.name).toBe("Andi Susanto");
      expect(body.email).toBe("andisusanto@contoh.com");
      expect(body.phoneNumber).toBe("555-1234");
      expect(body.Vehicle).toBeInstanceOf(Object);
      expect(body.Vehicle.UserId).toBe(1);
    });
  });

  describe("GET /users/currentUser fail", () => {
    it("should response with status 400 and error message if access token is not given", async () => {
      const { status, body } = await request(app).get("/users/currentUser");
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBe("Access Token Missing");
    });

    it("should response with status 403 and error message if access token is invalid", async () => {
      const { status, body } = await request(app)
        .get("/users/currentUser")
        .set({ access_token: "wrongaccesstoken" });
      expect(status).toBe(403);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBe("Forbidden");
    });
  });
});
