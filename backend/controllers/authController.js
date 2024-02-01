const { signUpValidation, passwordValidation } = require("../utils/inputValidation");
const { User } = require("../models/UserModel");
const { createHashedPassword, authenticateUser, verifyHashedPassword, logoutUser } = require("../utils/authentication");

// const signup = async (req, res) => {
//     try {
//         if (req.session.userID) {
//             return res
//                 .status(409)
//                 .json({
//                     message: "Already logged in"
//                 });
//         }
//         const signupDataErrors = await signUpValidation(req);
//         if (!signupDataErrors.isEmpty()) {
//             return res
//                 .status(400)
//                 .json({
//                     errors: signupDataErrors.array()
//                 });
//         }
//         let user = await User.findOne({ email: req.body.email });
//         if (user) {
//             return res
//                 .status(400)
//                 .json({ message: "User already exists" });
//         }
//         if (!passwordValidation(req)) {
//             return res
//                 .status(422)
//                 .json({
//                     message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
//                 });
//         }
//         user = new User({
//             name: req.body.name,
//             email: req.body.email,
//             password: createHashedPassword(req),
//         });
//         await user.save();
//         authenticateUser(req, user);
//         return res
//             .status(200)
//             .json({
//                 message: "SignUp Success"
//             });
//     }
//     catch (err) {
//         logoutUser(req);
//         return res
//             .status(500)
//             .json({
//                 error: err.name,
//                 message: err.message,
//                 path: "Signup"
//             });
//     }
// }

// const login = async (req, res) => {
//     try {
//         if (req.session.userID) {
//             return res
//                 .status(409)
//                 .json({
//                     message: "Already logged in"
//                 });
//         }
//         let user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             return res
//                 .status(401)
//                 .json({ message: "Incorect Credentials" });
//         }
//         if (!verifyHashedPassword(req, user)) {
//             return res
//                 .status(401)
//                 .json({ message: "Incorect Credentials" });
//         }
//         authenticateUser(req, user)
//         user = await User.findById(req.session.userID).select("-password -__v -_id");
//         return res
//             .status(200)
//             .json({
//                 message: "Login Success"
//             });
//     }
//     catch (err) {
//         logoutUser(req);
//         return res
//             .status(500)
//             .json({
//                 error: err.name,
//                 message: err.message,
//                 path: "Login"
//             });
//     }
// }

// const logout = async (req, res) => {
//     isAuthenticated(req, res, () => {
//         try {
//             logoutUser(req)
//                 .then(() => {
//                     return res
//                         .status(200)
//                         .json({
//                             message: "Logout Success!"
//                         });
//                 })
//         }
//         catch (err) {
//             return res
//                 .status(500)
//                 .json({
//                     error: err.name,
//                     message: err.message,
//                     path: "Logout"
//                 });
//         }
//     });
// }

// const isAuth = async (req, res) => {
//     try {
//         if (req.session.userID) {
//             return res
//                 .status(200)
//                 .json({
//                     message: "Authenticated"
//                 });
//         }
//         else {
//             return res
//                 .status(401)
//                 .json({
//                     message: "Unauthenticated"
//                 });
//         }
//     }
//     catch (err) {
//         return res
//             .status(500)
//             .json({
//                 error: err.name,
//                 message: err.message,
//                 path: "isAuthenticated"
//             });
//     }
// }

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        const exisUser = await User.findOne({email: email});
        if (exisUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            name,
            email,
            password
        });
        await newUser.save();
        res.status(200).json({
            message: "User created successfully"
        });
    }
    catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
};

const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        const user = await User.findOne({ email: email }).select("-password -__v");
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = await User.findOne({ email: email, password: password })
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken.sign({
            user: {
                id: user.id
            }
        }, "secret")
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: user
        });
    }
    catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
};


module.exports = {
    signup,
    login,
    // logout,
    // isAuth
}