const router = require("express").Router();
const chatController = require("../controllers/chatController");

router.post("/individual", chatController.individualChat);

module.exports = router;