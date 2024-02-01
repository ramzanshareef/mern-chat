const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { Chat } = require("../models/chatModel");
const { User } = require("../models/UserModel");


const sendIndMessage = async (req, res) => {
    isAuthenticated(req, res, async () => {
        try {
            const senderID = req.user.id;
            const recieverID = req.body.recieverID;
            const message = req.body.message;
            let chat = await Chat.findOne({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: senderID } } },
                    { users: { $elemMatch: { $eq: recieverID } } }
                ]
            });
            if (!chat) {
                const newChat = Chat.create({
                    isGroupChat: false,
                    users: [senderID, recieverID],
                    groupName: null,
                    groupAdmin: null,
                });
                (await newChat).messages.push({
                    sender: senderID,
                    message: message
                });
                (await newChat).save();
                (await newChat).populate("messages.sender", "name");
                res.status(200).json({
                    message: "Message saved successfully",
                    chat: newChat
                });
            }
            else {
                chat.messages.push({
                    sender: senderID,
                    message: message
                })
                await chat.save();
                await chat.populate("messages.sender", "name")
                res.status(200).json({
                    message: "Message saved successfully",
                    chat: chat
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
};

const sendGroupMessage = async (req, res) => {
    isAuthenticated(req, res, async () => {
        try {
            const { senderId, groupId, message } = req.body;
            const group = await Chat.findById(groupId);
            if (!group) {
                res.status(404).json({
                    message: "Group not found"
                });
            }
            else {
                group.messages.push({
                    sender: senderId,
                    message: message
                });
                group.save();
                res.status(200).json({
                    message: "Message saved successfully in the group"
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: "Internal server error - Send group message"
            });
        }
    });
}

const getIndividualChat = async (req, res) => {
    isAuthenticated(req, res, async () => {
        try {
            const recieverID = req.body.recieverID;
            const senderID = req.user.id;
            const chat = await Chat.findOne({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: senderID } } },
                    { users: { $elemMatch: { $eq: recieverID } } }
                ]
            }).populate("users", "name").populate("messages.sender", "name");
            if (!chat) {
                res.status(404).json({
                    message: "Chat not found"
                });
            }
            else {
                res.status(200).json({
                    message: "Chat found",
                    chat: chat
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: "Internal server error - Get individual chat"
            });
        }
    });
}

// const getGroupChat = async (req, res) => {
//     isAuthenticated(req, res, async () => {
//         try {
//             const { groupId } = req.body;
//             const chat = await Chat.findById(groupId).populate("users", "name");
//             if (!chat) {
//                 res.status(404).json({
//                     message: "Chat not found"
//                 });
//             }
//             else {
//                 res.status(200).json({
//                     message: "Chat found",
//                     chat: chat
//                 });
//             }
//         }
//         catch (err) {
//             res.status(500).json({
//                 message: "Internal server error - Get group chat"
//             });
//         }
//     });
// }

module.exports = {
    sendIndMessage,
    sendGroupMessage,
    getIndividualChat,
    // getGroupChat
}