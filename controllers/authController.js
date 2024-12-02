const authService = require("../services/authService");

exports.login = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ message: "Email, password and role are required." });
    }
    try {
        const token = await authService.login(email, password, role);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600 * 1000,
            sameSite: "Strict",
        });
        if (role === "agent") {
            res.redirect("/dashboard");
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    const { firstName, lastName, email, password, role, address, birthday } = req.body;
    if (!firstName || !lastName || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required." });
    }
    try {
        const token = await authService.register(firstName, lastName, email, password, role, address, birthday);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600 * 1000,
            sameSite: "Strict",
        });
        res.redirect("/dashboard");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        await authService.logout(req, res);
    } catch (error) {
        res.status(500).json({ message: "Logout failed." });
    }
};