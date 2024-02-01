// const { body, validationResult } = require("express-validator");

const signUpValidation = async (req) => {
    const validationRules = [
        body("name", "Enter a Valid Name").isLength({ min: 3 }),
        body("email", "Enter a Valid Email").isEmail(),
        body("password", "Enter a Valid Password").isLength({ min: 8 })
    ];
    await Promise.all(validationRules.map((validationRule) => validationRule.run(req)));
    
    return validationResult(req);
}

const passwordValidation = (req) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    return regex.test(req.body.password);
};



module.exports = {
    signUpValidation,
    passwordValidation
};