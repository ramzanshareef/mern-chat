const http = require("http");
const cors = require("cors");
const express = require("express");
const iot = require("socket.io");
const frontendURL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
const port = process.env.PORT || 5000;
const dbURL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/chatter";


const corsConfig = cors({
    origin: frontendURL,
    credentials: true
});

const jsonContentConfig = express.json();

const serverConfig = (app) => {
    app.use(corsConfig);
    app.use(jsonContentConfig);
};


module.exports = {
    serverConfig,
    port,
    dbURL
}