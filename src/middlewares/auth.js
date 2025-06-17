const JWT = require("jsonwebtoken");
// Import JWT for token generation

const userAuth = (req, res, next) => {
    // Read the token from the request headers
    const { token } = req.cookies;

}