const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models/index");
const { User, Cuisine, Category } = require("../../models/index");
const { signToken } = require("../../helper/jwt");
const { name } = require("ejs");

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

  const seedCategory = [
    {
      name: "Goreng",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Bakar",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const seedCuisine = [
    {
      name: "Ikan Salai 1",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 2,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 2",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 3",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 4",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 5",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 6",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 2,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 7",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 8",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 2,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 9",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 10",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 11",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 12",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 13",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 14",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 15",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 16",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 17",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 18",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 19",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ikan Salai 20",
      description: "Ikan salai yang di asapi",
      price: 20000,
      imgUrl:
        "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // await Category.create(seedCategory);
  await User.create(seedAdmin);
  await sequelize.queryInterface.bulkInsert("Categories", seedCategory);

  // await Cuisine.create(seedCuisine);
  await sequelize.queryInterface.bulkInsert("Cuisines", seedCuisine);
  //   await Cuisine.bulkCreate(seedCuisine);
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

describe("GET /cuisines/pub", () => {
  test("Berhasil mendapatkan entitas utama tanpa menggunakan query filter parameter", async () => {
    // const params = 1
    const response = await request(app).get(`/cuisines/pub`);

    // console.log(response.body, "<<< Seed");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("price");
      expect(item).toHaveProperty("imgUrl");
      expect(item).toHaveProperty("categoryId");
      expect(item).toHaveProperty("authorId");
      expect(item).toHaveProperty("createdAt");
      expect(item).toHaveProperty("updatedAt");
    });
  });

  test("Berhasil mendapatkan entitas utama dengan 1 filter query parameter", async () => {
    const filter = 1;

    const response = await request(app).get(`/cuisines/pub?filter=${filter}`);

    // console.log(response.body, "<<< pake filter");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("price");
      expect(item).toHaveProperty("imgUrl");
      expect(item).toHaveProperty("categoryId");
      expect(item).toHaveProperty("authorId");
      expect(item).toHaveProperty("createdAt");
      expect(item).toHaveProperty("updatedAt");
    });
  });

  test("Berhasil mendapatkan entitas utama dengan 1 filter query parameter", async () => {
    const size = 5;
    const number = 2;

    const response = await request(app).get(
      `/cuisines/pub?page[size]=${size}&page[number]=${number}`
    );

    // console.log(response.body, "<<< pake filter");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("price");
      expect(item).toHaveProperty("imgUrl");
      expect(item).toHaveProperty("categoryId");
      expect(item).toHaveProperty("authorId");
      expect(item).toHaveProperty("createdAt");
      expect(item).toHaveProperty("updatedAt");
    });
  });
});
