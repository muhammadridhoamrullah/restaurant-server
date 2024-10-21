const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models/index");
const { User, Cuisine, Category } = require("../../models/index");
const { signToken } = require("../../helper/jwt");

let accessTokenAdmin;
let accessTokenStaff;
let accessTokenStaff2;
let categoryId;
let userId;
let cuisineId;

beforeAll(async () => {
  const seedAdmin = {
    username: "admin",
    email: "admin@mail.com",
    password: "1234567890",
    role: "Admin",
    phoneNumber: "085363508580",
    address: "Jalan Pemuda",
  };

  const seedStaff = {
    username: "ridho user",
    email: "ridho@mail.com",
    password: "1234567890",
    role: "Staff",
    phoneNumber: "085363508580",
    address: "Jalan Pemuda",
  };

  const seedStaff2 = {
    username: "ridho staff",
    email: "ridhos@mail.com",
    password: "1234567890",
    role: "Staff",
    phoneNumber: "085363508580",
    address: "Jalan Pemudaa",
  };

  const seedCategory = {
    name: "Goreng",
  };

  const seedCuisine = {
    name: "Ikan Salai",
    description: "Ikan salai yang di asapi",
    price: 20000,
    imgUrl: "ikansalai.com",
    categoryId: 1,
    authorId: 2,
  };

  const newCategory = await Category.create(seedCategory);
  categoryId = newCategory.id;

  const newUserAdmin = await User.create(seedAdmin);
  accessTokenAdmin = signToken({ id: newUserAdmin.id });

  const newUserStaff = await User.create(seedStaff);
  accessTokenStaff = signToken({ id: newUserStaff.id });

  const newUserStaff2 = await User.create(seedStaff2);
  accessTokenStaff2 = signToken({ id: newUserStaff2.id });

  const newCuisine = await Cuisine.create(seedCuisine);
  cuisineId = newCuisine.id;
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Cuisines", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

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

describe("PUT /cuisines/:id", () => {
  test("Berhasil mengupdate data entitas utama berdasarkan params id yang diberikan", async () => {
    const params = 1;
    const body = {
      name: "Ikan Salai Asap",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl: "ikansalai.com",
      categoryId: params,
      authorId: 2,
    };
    const response = await request(app)
      .put(`/cuisines/${params}`)
      .send(body)
      .set("authorization", `Bearer ${accessTokenAdmin}`);

    // console.log(response.body, "error put");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // expect(response.body).toHaveProperty(1);
  });

  test("Gagal menjalankan fitur karena belum login", async () => {
    const params = 1;
    const body = {
      name: "Ikan Salai Asap",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl: "ikansalai.com",
      categoryId: params,
      authorId: 2,
    };
    const response = await request(app).put(`/cuisines/${params}`).send(body);

    // console.log(response.body, "<< anjay gemink");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "PLEASE LOGIN FIRST");
  });

  test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    const params = 1;
    const body = {
      name: "Ikan Salai Asap",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl: "ikansalai.com",
      categoryId: params,
      authorId: 2,
    };
    const response = await request(app)
      .put(`/cuisines/${params}`)
      .send(body)
      .set("authorization", `Bearer iniTokenSalah`);

    // console.log(response.body, "<< error token salah");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "INVALID TOKEN");
  });

  test("Gagal karena id entity yang dikirim tidak terdapat di database", async () => {
    const params = 1000; // id yang salah
    const body = {
      name: "Ikan Salai Asap",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl: "ikansalai.com",
      categoryId: params,
      authorId: 2,
    };
    const response = await request(app)
      .put(`/cuisines/${params}`)
      .send(body)
      .set("authorization", `Bearer ${accessTokenAdmin}`);

    // console.log(response.body, "<<< error id salah");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "DATA NOT FOUND");
  });

  test("Gagal menjalankan fitur ketika Staff mengedit yang bukan miliknya", async () => {
    const params = 1; // id yang salah
    const body = {
      name: "Ikan Salai Asap",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl: "ikansalai.com",
      categoryId: params,
      authorId: 2,
    };
    const response = await request(app)
      .put(`/cuisines/${params}`)
      .send(body)
      .set("authorization", `Bearer ${accessTokenStaff2}`); // ini token user ke 3

    console.log(response.body, "<<< error staff bukan miliknya");
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "YOU HAVE NO ACCESS");
  });

  test("Gagal ketika request body yang dikirimkan tidak sesuai", async () => {
    const params = 1; // id yang salah
    const body = {
      name: "", // inputan body salah
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl: "ikansalai.com",
      categoryId: params,
      authorId: 1,
    };

    const response = await request(app)
      .put(`/cuisines/${params}`)
      .send(body)
      .set("authorization", `Bearer ${accessTokenAdmin}`);

    // console.log(response.body, "<< error body salah");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name harus diisi!");
  });
});
