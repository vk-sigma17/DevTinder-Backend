const validator = require('validator');  // Assuming you're using the 'validator' package

const signupValidationData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    
    // Validate first and last name
    if (!firstName || !lastName) {
        throw new Error("Enter valid First and Last Name");
    }
    
    // Validate email format
    if (!validator.isEmail(email)) {
        throw new Error("Enter valid Email");
    }
    
    // Validate password strength
    if (!validator.isStrongPassword(password)) {
        throw new Error("Enter valid Password");
    }
};

module.exports = { signupValidationData };
