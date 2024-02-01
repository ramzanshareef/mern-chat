const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.header("token")
    if (!token) {
        return res.status(401).json({ message: "No token provided!" });
    }
    jwt.verify(token, "secret", (err, data) => {
        if (data) {
            req.user = data.user;
            next();
        }
        else{
            console.log("Not authenticated")
        }
    });
};

module.exports = {
    isAuthenticated
};