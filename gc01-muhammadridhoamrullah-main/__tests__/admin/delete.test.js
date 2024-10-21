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

describe("DELETE /cuisines/:id", () => {
  test("Gagal menjalankan fitur ketika Staff menghapus yang bukan miliknya", async () => {
    const params = 1;
    const response = await request(app)
      .delete(`/cuisines/${params}`)
      .set("authorization", `Bearer ${accessTokenStaff2}`);

    // console.log(response.body, "<<< error staff bukan miliknya");
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "YOU HAVE NO ACCESS");
  });

  test("Berhasil menghapus data entitas utama berdasarkan params id", async () => {
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
      .delete(`/cuisines/${params}`)
      .send(body)
      .set("authorization", `Bearer ${accessTokenAdmin}`);

    // console.log(response.body, "<<< res delete");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Ikan Salai success to delete"
    );
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
    const response = await request(app)
      .delete(`/cuisines/${params}`)
      .send(body);

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
      .delete(`/cuisines/${params}`)
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
      id: 1,
      name: "Ikan Salai Asap",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl: "ikansalai.com",
      categoryId: params,
      authorId: 2,
    };
    const response = await request(app)
      .delete(`/cuisines/${params}`)
      .send(body)
      .set("authorization", `Bearer ${accessTokenAdmin}`);

    // console.log(response.body, "<<< error id salah");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "DATA NOT FOUND");
  });
});
