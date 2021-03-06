const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const connectToMongoDB = require("../../db");
const User = require("../../db/models/User");
const app = require("../index");

let DB;

beforeAll(async () => {
  DB = await MongoMemoryServer.create();
  const uri = DB.getUri();
  await connectToMongoDB(uri);
  User.deleteMany({});
});
afterAll(async () => {
  await mongoose.connection.close();
  await DB.stop();
});

beforeEach(async () => {
  User.create({
    username: "Beren",
    password: "$2b$10$9Xleqvk5uvTvqWi059uB7Oh9mmaPojCH668ZbejV5Ekj.Co14Cz3e",
    name: "Berenguer Pou",
    image:
      "https://firebasestorage.googleapis.com/v0/b/beringar-network.appspot.com/o/1645977562055_porto-teatre-sang-adhesiu_petit.jpg?alt=media&token=b303c64c-5dc0-4330-8ebe-daa244018da5",
  });
  User.create({
    username: "Pere7",
    password: "$2b$10$CTmxgzRw/E2bCPiXk0j0Pe7BHbj3YQhA/adwhuNsU.pIlE4LO97Fy",
    name: "Pere Fullana",
    image:
      "https://firebasestorage.googleapis.com/v0/b/beringar-network.appspot.com/o/1645977562055_porto-teatre-sang-adhesiu_petit.jpg?alt=media&token=b303c64c-5dc0-4330-8ebe-daa244018da5",
  });
  User.create({
    username: "Maria8",
    password: "$2b$10$CTmxgzRw/E2bCPiXk0j0Pe7BHbj3YQhA/adwhuNsU.pIlE4LO97Ft",
    name: "Maria Morella",
    image:
      "https://firebasestorage.googleapis.com/v0/b/beringar-network.appspot.com/o/1645977562055_porto-teatre-sang-adhesiu_petit.jpg?alt=media&token=b303c64c-5dc0-4330-8ebe-daa244018da5",
  });
});

describe("Given a usersRouter", () => {
  describe("When it receives a GET request at /users", () => {
    test("Then it should respond with status 200 and and an array wiht all users", async () => {
      const user = {
        username: "Beren",
        password: "asasas",
      };

      const {
        body: { token },
      } = await request(app).post("/users/login").send(user);
      const { body } = await request(app)
        .get("/users")
        .set("Authorization", token)
        .expect(200);

      expect(body).toHaveProperty("users");
      expect(body.users).toHaveLength(3);
    });
  });
});
