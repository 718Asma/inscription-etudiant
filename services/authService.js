const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Agent = require("../models/agent");

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

exports.login = async (email, password) => {
    try {
        const agent = await Agent.findOne({ email });
        if (agent && bcrypt.compareSync(password, agent.password)) {
            return generateToken(agent);
        } else {
            throw new Error("Invalid email or password.");
        }
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
};

exports.register = async (firstName, lastName, email, password) => {
    try {
        const s = await bcrypt.genSalt(Number(salt)); // Generate salt with the provided rounds
        const hashedPassword = await bcrypt.hash(password, s); // Hash the password with the generated salt
        const agent = new Agent({ firstName, lastName, email, password: hashedPassword });
        await agent.save();
        return generateToken(agent);
    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
};

// exports.register = async (firstName, lastName, address, birthday, email, password) => {
//     try {
//         const s = await bcrypt.genSalt(Number(salt));
//         const hashedPassword = await bcrypt.hash(password, s);
//         const agent = new agent({ firstName, lastName, address, birthday, email, password: hashedPassword });
//         await agent.save();
//         return generateToken(agent);
//     } catch (error) {
//         throw new Error(`Registration failed: ${error.message}`);
//     }
// };

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, sameSite: "Strict" });
        res.redirect("/login");
    } catch (error) {
        res.status(500).json({ message: "Logout failed." });
    }
};