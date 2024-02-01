const mongoose = require("mongoose");
const { dbURL } = require("../config/configs");

const connectDB = async (req, res) => {
    try {
        console.log("DBURL = ", dbURL)
        await mongoose.connect(dbURL)
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch((err) => {
                console.log(err.mesaage);
            });
    }
    catch (err) {
        console.log(err.mesaage);
    }
}

module.exports = {
    connectDB
}