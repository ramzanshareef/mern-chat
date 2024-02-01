const router = require("express").Router();
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");
const messageRoutes = require("./messageRotes");

const routesSetUp = () => {
    router.use("/user", userRoutes);
    router.use("/chat", chatRoutes);
    router.use("/message", messageRoutes);
    return router;
}

module.exports = {
    routesSetUp
};