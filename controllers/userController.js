exports.login = (req, res) => {
    if (req.body.email && req.body.password) {
        res.send(`Connecté:\t${JSON.stringify(req.body)}`);
    } else {
        res.status(400).json({ message: "Invalid email or password." });
    }
};

exports.register = (req, res) => {
    if (req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
        res.send(`Compte Créé:\t${JSON.stringify(req.body)}`);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
};

exports.getProfile = (req, res) => {
    console.log(req.params.id);
    res.send(`User ID: ${req.params.id}`);
};

exports.updateProfile = (req, res) => {
    if (req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
        res.send(`Modifier Profile ID: ${req.params.id}\n${JSON.stringify(req.body)}`);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
};

exports.deleteProfile = (req, res) => {
    console.log(req.params.id);
    res.send(`Supprimer Profile ID: ${req.params.id}`);
};
