const faculteService = require("../services/faculteService");

exports.getAllFacultes = async (req, res) => {
    const facultes = await faculteService.getAllFacultes();

    if (facultes) {
        res.render("pages/faculte", { facultes: facultes });
    } else {
        res.status(500).json({ message: "Erreur lors de la récupération des facultes." });
    }
}

exports.getFaculte = async (req, res) => {
    if (req.params.id) {
        const faculte = await faculteService.getFaculte(req.params.id);
        res.json(faculte);
        // res.render("pages/faculte", { faculte: faculte });
    }
}

exports.addFaculte = async (req, res) => {
    if (req.body.name && req.body.address && req.body.phone && req.body.email) {
        const faculty = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email
        };

        const newFaculte = await faculteService.addFaculte(faculty);
        res.json(newFaculte);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
}

exports.updateFaculte = async (req, res) => {
    if (req.params.id && req.body.name && req.body.address && req.body.phone && req.body.email) {
        const faculty = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email
        };
        const faculte = await faculteService.updateFaculte(req.params.id, faculty);
        res.json(faculte);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
}

exports.deleteFaculte = async (req, res) => {
    if(req.params.id) {
        const faculte = await faculteService.deleteFaculte(req.params.id);
        res.json(faculte);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
}