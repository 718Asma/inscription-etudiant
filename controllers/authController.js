const { render } = require("ejs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign(
        { email: user.email, firstName: user.firstName, lastName: user.lastName },
        process.env.ACCESS_JWT_SECRET,
        { expiresIn: '1h' }
    );
};

exports.login = (req, res) => {
    if (req.body.email && req.body.password) {
        const user = { email: req.body.email, password: req.body.password };
        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600 * 1000, // 1 hour
            sameSite: "Strict",
        });

        res.redirect('/dashboard');
    } else {
        res.render("pages/login", { errorMessage: "Invalid email or password. Please try again." });
    }
};


exports.register = (req, res) => {
    if (req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
        const user = { email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password };
        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600 * 1000,
            sameSite: "Strict",
        });

        res.render('../views/pages/dashboard');
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "Strict" });
    res.redirect("/login");
};
