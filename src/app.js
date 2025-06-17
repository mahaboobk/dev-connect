const express = require('express');
const connectDB = require('./config/database'); // Ensure database connection is established
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const JWT = require('jsonwebtoken'); // Import JWT for token generation
const app = express();
const cookies = require('cookie-parser'); // Import cookie-parser for handling cookies
const port = 3000;
const User = require('./models/user'); // Import the User model
const { validateSignupData } = require('./utils/validate'); // Import the validation function
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests
// POST API to create a new user
app.use(express.json())
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies
app.post("/signup", async (req, res) => {
    // Validate the user data
    try {
        validateSignupData(req.body); // Validate the input data
    } catch (error) {
        console.error("Validation error:", error.message);
        return res.status(400).json({ error: "Validation error: " + error.message });
    }

    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password.toString(), 1); // Hash the password
    // Create a new user instance
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        emailId: emailId.toLowerCase(), // Ensure email is stored in lowercase
        password: passwordHash, // Store the hashed password
        age: req.body.age,
        gender: req.body.gender.toLowerCase(), // Ensure
    });
    await newUser.save()
        .then(() => {
            res.status(201).json({ message: "User created successfully" });
        })
        .catch((error) => {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Internal server error: " + error.message });
        });
})
// Get user by email-Find user with email id
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({ emailId: userEmail })
        res.send(user)
    } catch (err) {
        res.status(400).send("Something went wrong!")
    }
})
app.use("/feed", async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.send(allUsers)
    } catch (err) {
        res.status(400).send("Not found Users")
    }
})
// Delete
app.delete("/user", async (req, res) => {
    const userId = req.body.userId
    try {
        const userName = await User.findById({ _id: userId })
        const user = await User.findByIdAndDelete({ _id: userId })
        res.send(userName + "Deleted Successfully")
    } catch (err) {
        res.status(400).send("Error in Delete")
    }
})
app.use("/age", async (req, res) => {
    try {
        const age = await User.findOne({ "age": 36 })
        res.send(age)
    } catch (err) {
        res.status(400).send("Not found Users with Age above 36")
    }
})
// UPDATE 
app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    console.log(data);
    try {
        const oldUser = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "after", runValidators: true });
        console.log('oldUser', oldUser)
        res.send("User Updated")
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ error: "Internal server error: " + error.message });
    }
})
//LOGIN
app.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    try {
        const user = await User.findOne({ emailId: emailId.toLowerCase() }); // Find user by email
        console.log("User found:", user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Create a JWT token or handle invalid credentials
            console.error("Invalid credentials for user:", emailId);
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Generate a JWT token
        const token = await JWT.sign({ _id: user._id }, "secretkey"); // Use a secret key and set an expiration time
        // Set the token in a cookie
        res.cookie("token", token, { httpOnly: true, secure: true }); // Set a cookie with the JWT token
        console.log("User logged in successfully:", emailId);
        res.status(200).json({
            message: "Login successful", user: {
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                age: user.age,
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error: " + error.message });
    }
})
// PROFILE
app.get("/profile", async (req, res) => {
    try {
        // Check if the user is authenticated           
        const cookies = req.cookies; // Assuming you are using cookie-parser middleware
        const token = cookies.token; // Get the token from cookies
        if (!token) {
            return res.status(401).json({ error: "Unauthorized access - No token provided" });
        }
        const decodedMessage = await JWT.verify(token, "secretkey"); // Verify the token
        if (!decodedMessage) {
            return res.status(401).json({ error: "Unauthorized access" });
        }
        console.log("Cookies:", cookies);
        res.send("Profile Page - User is logged in" + `\nUser ID: ${decodedMessage._id}`);
    } catch (error) {
        console.error("Profile access error:", error);
        res.status(500).json({ error: "Internal server error: " + error.message });
    }
})

// Connect to MongoDB and start the server  
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