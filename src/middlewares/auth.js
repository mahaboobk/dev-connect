const JWT = require("jsonwebtoken");
const User = require('../models/user')
// Import JWT for token generation

const userAuth = async (req, res, next) => {
    // Read the token from the request headers
    // validate the token and find the user
    try {
        const { token } = req.cookies;
        console.log(token)
        if (!token) {
            throw new Error("Token is invalid")
        }
        const decodedMessage = await JWT.verify(token, "secret123");
        console.log('UserAuth', decodedMessage)
        const { _id } = decodedMessage
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User Not found")
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send('ERROR' + err.message)
    }

}

module.exports = {
    userAuth
};