const mongoose = require('mongoose');
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

module.exports = mongoose.model('User', userSchema);