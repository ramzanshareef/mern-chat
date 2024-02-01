const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.get("/", userController.getUser)
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/users", userController.getAllUsers);
// router.post("/logout", authController.logout);

module.exports = router;