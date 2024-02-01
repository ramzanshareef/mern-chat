const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { User } = require("../models/UserModel");

const getUser = (req, res) => {
    isAuthenticated(req, res, async () => {
        const user = await User.findById(req.user.id).select("-password -__v");
        return res
            .status(200)
            .json({
                user: user
            });
    });
};

const getAllUsers  = async (req, res) => {
    isAuthenticated(req, res, async () => {
        try{
            const keyword = req.body.keyword
            ? {
                $or: [
                    { name: { $regex: req.body.keyword, $options: "i" } },
                    { email: { $regex: req.body.keyword, $options: "i" } },
                ]
            }
            : {};
            const users = await User.find(keyword).find({ _id: { $ne: req.user.id } }).select("-password -__v");
            if (users.length === 0) {
                return res
                    .status(200)
                    .json({
                        message: "No users found"
                    });
            }
            return res
                .status(200)
                .json({
                    users: users
                });
        } catch (error) {
            return res
                .status(500)
                .json({
                    error: error.message
                });
        }
    });
};

module.exports = {
    getUser,
    getAllUsers
};