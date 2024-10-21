const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models/index");
const { User } = require("../../models/index");
// const { signToken, verifyToken } = require("../helper/jwt");

// router.post("/login", Controller.login);
// let accessToken;
beforeAll(async () => {
  const data = {
    username: "ridhoamrullah",
    email: "ridhoamrullah99@gmail.com",
    password: "1234567890",
    role: "Admin",
    phoneNumber: "085363508580",
    address: "Jalan Pemuda",
  };

  const newUser = await User.create(data);
  //   await sequelize.queryInterface.bulkInsert("Users", newUser);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /login", () => {
  //SUCCESS
  test("Berhasil login dan menampilkan token", async () => {
    const body = {
      email: "ridhoamrullah99@gmail.com",
      password: "1234567890",
    };

    const response = await request(app).post("/login").send(body);

    // console.log(response.body, "<<< response 1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  //FAILED
  test("email tidak diberikan / tidak diinput", async () => {
    const body = {
      password: "1234567890",
    };

    const response = await request(app).post("/login").send(body);
    // console.log(response.body, "<<< failed 1");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "EMAIL OR PASSWORD IS REQUIRED"
    );
  });

  test("password tidak diberikan / tidak diinput", async () => {
    const body = {
      email: "ridhoamrullah99@gmail.com",
    };

    const response = await request(app).post("/login").send(body);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "EMAIL OR PASSWORD IS REQUIRED"
    );
  });

  test("email invalid / tidak terdaftar", async () => {
    const body = {
      email: "wrongemail@gmail.com",
      password: "1234567890",
    };

    const response = await request(app).post("/login").send(body);

    // console.log(response.body, "<<< woiwww");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "INVALID EMAIL OR PASSWORD"
    );
  });

  test("password diberikan salah / tidak match", async () => {
    const body = {
      email: "ridhoamrullah99@gmail.com",
      password: "anjaygggemink",
    };
    const response = await request(app).post("/login").send(body);

    // console.log(response.body, "<<<< errornya");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "INVALID EMAIL OR PASSWORD"
    );
  });
});
