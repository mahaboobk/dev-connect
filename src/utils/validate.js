// Validate input data for the application
const validator = require('validator');
const validateSignupData = (data) => {
    const { firstName, lastName, emailId, password, gender } = data;

    if (!firstName || firstName.length < 3 || firstName.length > 20) {
        throw new Error("First name must be between 3 and 20 characters long");
    } else if (validator.isEmpty(firstName)) {
        throw new Error("First name is required");
    }
    if (!lastName || lastName.length < 3 || lastName.length > 20) {
        throw new Error("Last name must be between 3 and 20 characters long");
    }
    else if (validator.isEmpty(lastName)) {
        throw new Error("Last name is required");
    }
    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Invalid email address");
    }
    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    } else if (validator.isStrongPassword(password, { minLength: 6 })) {
        throw new Error("Password must be at least 6 characters long");
    }
    if (!gender || (gender !== 'male' && gender !== 'female' && gender !== 'other')) {
        throw new Error("Invalid gender: gender must be 'male', 'female', or 'other'");
    }
    return true;
}

module.exports = {
    validateSignupData
};