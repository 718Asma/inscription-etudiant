const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"] || req.cookies.token;

    if (!bearerHeader || typeof bearerHeader !== "string") {
        return res.status(401).send("Non autorisé - Jeton manquant");
    }

    let bearerToken = bearerHeader;

    if (bearerHeader.startsWith("Bearer ")) {
        bearerToken = bearerHeader.split(" ")[1];
    }

    req.token = bearerToken;

    jwt.verify(bearerToken, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send("Non autorisé - Jeton invalide");
        }
        req.userId = decoded.user;

        next();
    });
}

module.exports = verifyToken;
