const etudiantService = require("../services/etudiantService");

exports.getAllProfiles = async (req, res) => {
    const etudiants = await etudiantService.getAllProfiles();

    if (etudiants) {
        res.render("pages/etudiant", { profiles: etudiants });
    } else {
        res.status(500).json({ message: "Erreur lors de la récupération des profils." });
    }
};

exports.getProfile = async (req, res) => {
    if (req.params.id) {
        const etudiant = await etudiantService.getProfile(req.params.id);
        res.json(etudiant);
        // res.render("pages/profile", { profile: etudiant });
    }
};

exports.updateProfile = async (req, res) => {
    if (req.params.id && req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
        const etudiant = await etudiantService.updateProfile(req.params.id, req.body);
        res.json(etudiant);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
};

exports.deleteProfile = async (req, res) => {
    if(req.params.id) {
        const etudiant = await etudiantService.deleteProfile(req.params.id);
        res.json(etudiant);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
};
