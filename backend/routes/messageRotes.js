const messageController = require("../controllers/messageController");

const router = require("express").Router();

router.post("/sendIndMsg", messageController.sendIndMessage);
router.post("/sendGrpMsg", messageController.sendGroupMessage);
router.post("/getIndMsgs", messageController.getIndividualChat);

module.exports = router;