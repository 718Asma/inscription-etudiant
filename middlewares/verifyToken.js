const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    // First, try to get the token from the Authorization header
    const bearerHeader = req.headers["authorization"] || req.cookies.token;

    // If there's no token in both places, return a 401 Unauthorized error
    if (!bearerHeader || typeof bearerHeader !== "string") {
        return res.status(401).send("Non autorisé - Jeton manquant");
    }

    // If it's the Authorization header, split the token (if it follows "Bearer <token>")
    let bearerToken = bearerHeader;

    // Only split if the header is using the Bearer schema (Authorization: Bearer <token>)
    if (bearerHeader.startsWith("Bearer ")) {
        bearerToken = bearerHeader.split(" ")[1]; // Extract the token part
    }

    req.token = bearerToken;

    // Verify the token using the secret key
    jwt.verify(bearerToken, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send("Non autorisé - Jeton invalide");
        }
        // Store the decoded user data (user ID) in the request object for use in subsequent middleware
        req.userId = decoded.user;

        next();
    });
}

module.exports = verifyToken;
