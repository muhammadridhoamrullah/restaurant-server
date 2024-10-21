// const Controller = require("../controllers/controller");
const ControllerCategories = require("../controllers/controllerCategories");
// const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = require("express").Router();

// router.use(authentication);
router.post("/", ControllerCategories.addCategory);

router.get("/", ControllerCategories.getCategories);

router.put("/:id", ControllerCategories.editCategory);

router.delete("/:id", ControllerCategories.deleteCategory);
router.use(errorHandler);

module.exports = router;
