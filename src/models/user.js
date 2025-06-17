const mongoose = require('mongoose');
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            // Regular expression to validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                throw new Error("Email is Invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value) {
            if (value.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }
        }
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        validate(value) {
            if (!['male', 'female', 'other'].includes(value)) {
                throw new Error("Gender Data is Invalid")
            }
        },
        required: true,
        lowercase: true,
        trim: true,
    },
    skills: {
        default: ["JavaScript", "Python", "Java", "C++", "C#", "Ruby", "Go", "Swift", "Kotlin", "PHP"],
        type: [String],
    },
    photoUrl: {
        type: String,
        default: "https://example.com/default-profile.png",
    }
})
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await JWT.sign({ _id: user._id }, "secret123");
    return token;
}
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isMatch = bcrypt.compare(passwordInputByUser, passwordHash);
    return isMatch;
}
module.exports = mongoose.model('User', userSchema);