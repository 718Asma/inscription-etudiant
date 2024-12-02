const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Agent = require('../models/agent');
const Etudiant = require('../models/etudiant');
const User = require('../models/user');

const salt = process.env.SALT;
if (!salt) {
    throw new Error("Salt value is missing in environment variables.");
}

const generateToken = (agent) => {
    return jwt.sign(
        { id: agent._id, email: agent.email },
        process.env.ACCESS_JWT_SECRET,
        { expiresIn: "1h" }
    );
};

exports.login = async (email, password, role) => {
    try {
        if (role !== 'agent' && role !== 'etudiant') {
            throw new Error("Invalid role.");
        }

        const etudiantOrAgent = await User.findOne({ email, role });

        if (etudiantOrAgent && bcrypt.compareSync(password, etudiantOrAgent.password)) {
            return generateToken(etudiantOrAgent);
        } else {
            throw new Error("Invalid email or password.");
        }
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
};

exports.register = async (firstName, lastName, email, password, role, address, birthday) => {
    try {
        if (!["agent", "etudiant"].includes(role)) {
            throw new Error("Invalid role. Role must be either 'agent' or 'etudiant'.");
        }

        const existingetudiant = await Agent.findOne({ email }) || await Etudiant.findOne({ email });
        if (existingetudiant) {
            throw new Error("Email already in use. Please choose a different email.");
        }

        const s = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, s);

        let etudiant;
        if (role === "agent") {
            etudiant = new Agent({ firstName, lastName, email, password: hashedPassword, role });
        } else if (role === "etudiant") {
            if (!address || !birthday) {
                throw new Error("Address and birthday are required for 'etudiant'.");
            }
            etudiant = new Etudiant({ firstName, lastName, email, password: hashedPassword, role, address, birthday });
        }

        await etudiant.save();
        return generateToken(etudiant);
    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, sameSite: "Strict" });
        res.redirect("/login");
    } catch (error) {
        res.status(500).json({ message: "Logout failed." });
    }
};