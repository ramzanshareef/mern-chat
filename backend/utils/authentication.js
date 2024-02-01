// const bcrypt = require("bcryptjs");
const myDateTime = require("./myDateTime");

const createHashedPassword = (req) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword =  bcrypt.hashSync(req.body.password, salt);
    return hashedPassword;
};

const verifyHashedPassword = async (req, user) => {
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    return validPassword;
};

const authenticateUser = async (req, user) => {
    const { id } = user;
    req.session.userID = id;
    req.session.loginTime = myDateTime(new Date());
    req.session.isAuthenticated = true;
    req.session.save();
    return Promise.resolve();
};

const logoutUser = async (req) => {
    req.session.isAuthenticated = false;
    req.session.destroy();
    return Promise.resolve();
};

module.exports = {
    createHashedPassword,
    verifyHashedPassword,
    authenticateUser,
    logoutUser
};