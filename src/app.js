const express = require('express');
const connectDB = require('./config/database'); // Ensure database connection is established
const app = express();
const port = 3000;
const User = require('./models/user'); // Import the User model
// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests
// POST API to create a new user
app.post("/signup", async (req, res) => {
    const userObject = {
        firstName: "Mahaboob",
        lastName: "Hussain",
        emailId: "mahaboob.lotus@gmail.com",
        password: "password123",
        age: 36,
        gender: "male"
    }
    const newUser = new User(userObject);
    await newUser.save()
        .then(() => {
            res.status(201).json({ message: "User created successfully" });
        })
        .catch((error) => {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Internal server error" });
        });
})
connectDB().then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("MongoDB connection failed:", err);
});


// Export the app for testing purposes
module.exports = app;   