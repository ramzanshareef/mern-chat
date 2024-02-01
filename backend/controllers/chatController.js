const { isAuthenticated } = require("../middlewares/isAuthenticated")
const { Chat } = require("../models/chatModel");


const individualChat = async (req, res) => {
    isAuthenticated(req, res, async () => {
        try {
            const { recieverID } = req.body;
            const senderID = req.user.id;
            const existingChat = await Chat.findOne({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: senderID } } },
                    { users: { $elemMatch: { $eq: recieverID } } }
                ]
            }).populate("users", "name email");
            if (existingChat) {
                return res.status(200).json({
                    chat: existingChat
                });
            }
            const newChat = new Chat({
                users: [senderID, recieverID],
                isGroupChat: false,
                groupAdmin: null,
                groupName: null,
            });
            await newChat.save();
            const chat = await Chat.findOne({
                users: {
                    $all: [senderID, recieverID]
                }
            }).populate("users", "name email");
            res.status(200).json({
                chat: chat
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    })
}

module.exports = {
    individualChat
}