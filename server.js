const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/usersRoutes");
const inscriptionRoutes = require("./routes/inscriptionRoutes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/inscription", inscriptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});