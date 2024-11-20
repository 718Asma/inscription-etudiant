const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // Add this line

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/usersRoutes");
const inscriptionRoutes = require("./routes/inscriptionRoutes");
const verifyToken = require("./middlewares/verifyToken");
const userController = require("./controllers/userController");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// EJS Routes
app.get("/login", (req, res) => {
    res.render("pages/login");
});
app.get("/register", (req, res) => {
    res.render('pages/signup');
});
app.get("/dashboard", verifyToken, (req, res) => {
    const token = req.cookies.token;
    if (token) {
        userController.getAllProfiles(req, res);
    } else {
        res.redirect("/login");
    }
});

app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inscription", inscriptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
