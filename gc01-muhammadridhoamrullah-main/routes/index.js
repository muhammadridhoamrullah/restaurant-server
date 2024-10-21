const Controller = require("../controllers/controller");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
const errorHandler = require("../middlewares/errorHandler");

const categoriesRouter = require("./categoriesRoutes");
const cuisineRouter = require("./cuisineRoutes");

const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({ storage });

// -------------LOGIN dan REGISTER--------------

router.post("/login", Controller.login);

router.post("/login-google", Controller.loginByGoogle);

router.post(
  "/add-user",
  authentication,
  authorizationAdmin,
  Controller.register
);

// --------------PUB------------------
router.get("/cuisines/pub", Controller.getCuisinesPub);
router.get("/cuisines/:id/pub", Controller.getCuisinesPubById);
// --------------PUB------------------

router.use(authentication);

//---------------CUISINE----------------
router.use("/cuisines", cuisineRouter);

// --------------CATEGORY---------------
router.use("/categories", categoriesRouter);

router.patch(
  "/cuisineImage/:id",
  authorization,
  upload.single("picture"),
  Controller.uploadImage
);

router.use(errorHandler);

module.exports = router;
