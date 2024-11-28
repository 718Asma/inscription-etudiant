const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require('method-override');

require('dotenv').config();

const authRoutes = require("./routes/authRoutes");
const etudiantRoutes = require("./routes/etudiantRoutes");
const inscriptionRoutes = require("./routes/inscriptionRoutes");
const verifyToken = require("./middlewares/verifyToken");
const userController = require("./controllers/etudiantController");
const inscriptionController = require("./controllers/inscriptionController");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb, {});
const db = mongoose.connection;
db.on("open", () => {
    console.log("Connected to MongoDB");
});
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(cookieParser());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set the view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// EJS Routes
app.get("/login", (req, res) => {
    res.render("pages/login");
});
app.get("/register", (req, res) => {
    res.render('pages/signup');
});
app.get("/dashboard", verifyToken, (req, res) => {
    res.redirect("/etudiants");
});
app.get("/etudiants", verifyToken, (req, res) => {
    const token = req.cookies.token;
    if (token) {
        userController.getAllProfiles(req, res);
    } else {
        res.redirect("/login");
    }
});
app.get("/inscriptions", verifyToken, (req, res) => {
    const token = req.cookies.token;
    if (token) {
        inscriptionController.getAllInscriptions(req, res);
    } else {
        res.redirect("/login");
    }
});
app.get("/", (req, res) => {
    const token = req.cookies.token;
    if (token) {
        res.redirect("/dashboard");
    } else {
        res.redirect("/login");
    }
});

app.use("/auth", authRoutes);
app.use("/api/etudiant", etudiantRoutes);
app.use("/api/inscription", inscriptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});