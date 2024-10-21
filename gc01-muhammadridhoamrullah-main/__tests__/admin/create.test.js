const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models/index");
const { User, Cuisine, Category } = require("../../models/index");
const { signToken } = require("../../helper/jwt");

let accessToken;
let categoryId;
let userId;

beforeAll(async () => {
  const seedUser = {
    username: "ridho user",
    email: "ridho@mail.com",
    password: "1234567890",
    role: "Staff",
    phoneNumber: "085363508580",
    address: "Jalan Pemuda",
  };

  const seedCategory = {
    name: "Gulai",
  };

  const category = await Category.create(seedCategory);
  categoryId = category.id;
  const newUser = await User.create(seedUser);
  userId = newUser.id;
  accessToken = signToken({ id: newUser.id });
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await sequelize.queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /cuisines", () => {
  test("Berhasil membuat entitas utama", async () => {
    const body = {
      name: "Talua Barendo",
      description: "Talua karitiang",
      price: 40000,
      imgUrl: "phototaluarbarendo.jpg",
      categoryId: categoryId,
    };
    const response = await request(app)
      .post("/cuisines")
      .send(body)
      .set("authorization", `Bearer ${accessToken}`);

    // console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", body.name);
    expect(response.body).toHaveProperty("description", body.description);
    expect(response.body).toHaveProperty("price", body.price);
    expect(response.body).toHaveProperty("imgUrl", body.imgUrl);
    expect(response.body).toHaveProperty("categoryId", body.categoryId);
    expect(response.body).toHaveProperty("authorId", userId);
  });

  test("Gagal menjalankan fitur karena belum login", async () => {
    const body = {
      name: "Talua Barendo",
      description: "Talua karitiang",
      price: 40000,
      imgUrl: "phototaluarbarendo.jpg",
      categoryId: categoryId,
    };

    const response = await request(app).post("/cuisines").send(body);

    // console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "PLEASE LOGIN FIRST");
  });

  test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    const body = {
      name: "Talua Barendo",
      description: "Talua karitiang",
      price: 40000,
      imgUrl: "phototaluarbarendo.jpg",
      categoryId: categoryId,
    };

    const response = await request(app)
      .post("/cuisines")
      .send(body)
      .set("authorization", `Bearer asasasasas`);

    // console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "INVALID TOKEN");
  });

  test("Gagal ketika request body tidak sesuai(validation required)", async () => {
    const body = {
      name: "", // <<< ini yang salah
      description: "Talua karitiang",
      price: 40000,
      imgUrl: "phototaluarbarendo.jpg",
      categoryId: categoryId,
    };

    const response = await request(app)
      .post("/cuisines")
      .send(body)
      .set("authorization", `Bearer ${accessToken}`);

    // console.log(response.body, "<<<anjay");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name harus diisi!");
  });
});
