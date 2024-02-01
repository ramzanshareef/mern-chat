const express = require("express");
const cors = require("cors");
const { port, serverConfig, chatConfig } = require("./config/configs");
const { connectDB } = require("./data/db");
const { routesSetUp } = require("./routes/allRoutes");
const app = express();


serverConfig(app);
// chatConfig(server);
app.use(routesSetUp());

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDB();
});

const io = require("socket.io")(server, {
    cors: {
        origin: process.env.REACT_APP_FRONTEND_URL,
    }
})

io.on("connection", (socket) => {
    socket.on("setup", (user) => {
        socket.join(user._id);
        socket.emit("connected", user);
    })
    socket.on("join chat", (chatID) => {
        socket.join(chatID);
    })
    socket.on("new message", (newMessage) => {
        var chatID = newMessage.chat._id;
        if (!chatID) return console.log("Invalid data");
        newMessage.chat.users.forEach((user) => {
            if (user === newMessage.chat.messages[newMessage.chat.messages.length - 1].sender._id){
                socket.in(user).emit("message sent", newMessage)
            }
            else{
                socket.in(user).emit("message received", newMessage);
            }
        });
        // io.to(chatID).emit("message received", newMessage); 
    })

    
});
