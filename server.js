const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connexion à un compte
app.post("/api/login", (req, res) => {
    if(req.body.email && req.body.password)
        res.send(`Connecté:\t${JSON.stringify(req.body)}`);
    else
        res.status(400).json({ message: "Invalid email or password." });
});

//Création d'un compte
app.post("/api/register", (req, res) => {
    if(req.body.firstName && req.body.lastName && req.body.email && req.body.password)
        res.send(`Compte Créé:\t${JSON.stringify(req.body)}`);
    else
        res.status(400).json({ message: "Attributs Manquants." });
});

//Récupérer la liste des utilisateurs
app.get("/api/users", (req, res) => {
    res.send("Liste des utilisateurs");
});

//Récupérer les informations d'un étudiant
app.get("/api/users/profile/:id", (req, res) => {
    console.log(req.params.id);
    res.send(`User ID: ${req.params.id}`);
});

//Modifier les informations d'un étudiant
app.put("/api/users/modifierProfile/:id", (req, res) => {
    if(req.body.firstName && req.body.lastName && req.body.email && req.body.password)
        res.send(`Modifier Profile ID: ${req.params.id}\n${JSON.stringify(req.body)}`);
    else
        res.status(400).json({ message: "Attributs Manquants." });
});

//Supprimer un compte
app.delete("/api/users/supprimerProfile/:id", (req, res) => {
    console.log(req.params.id);
    res.send(`Supprimer Profile ID: ${req.params.id}`);
});

//Recupérer la liste des inscriptions en attente
app.get("/api/inscription", (req, res) => {
    res.send("Liste des inscriptions en attente");
});

//Soumettre une demande d'inscription
app.post("/api/inscription", (req, res) => {
    if(req.body.niveau)
        res.send(`Inscription:\t${JSON.stringify(req.body)}`);
    else
        res.status(400).json({ message: "Attributs Manquants." });
});

//Valider une demande d'inscription
app.put("/api/inscription/valider/:id", (req, res) => {
    console.log(req.params.id);
    res.send(`Valider ID: ${req.params.id}`);
});

//Rejeter une demande d'inscription
app.put("/api/inscription/rejeter/:id", (req, res) => {
    console.log(req.params.id);
    res.send(`Rejeter ID: ${req.params.id}`);
});

//Récupérer l'état d'une demande d'inscription
app.get("/api/inscription/etat/:id", (req, res) => {
    console.log(req.params.id);
    res.send(`Inscription ID: ${req.params.id}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
