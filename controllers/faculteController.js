const faculteService = require("../services/faculteService");

exports.getAllFacultes = async (req, res) => {
    const facultes = await faculteService.getAllFacultes();

    if (facultes) {
        res.status(200).json(facultes);
        // res.render("pages/faculte", { facultes: facultes });
    } else {
        res.status(500).json({ message: "Erreur lors de la récupération des facultes." });
    }
}

exports.getFaculte = async (req, res) => {
    if (req.params.id) {
        const faculte = await faculteService.getFaculte(req.params.id);
        if (faculte) {
            res.status(200).json(faculte);
        } else {
            res.status(404).json({ message: "Faculté non trouvé."  });
        }
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
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "ID de la faculté manquant." });
        }

        const { name, address, phone, email } = req.body;
        if (!name && !address && !phone && !email) {
            return res.status(400).json({ message: "Au moins un attribut est requis pour la mise à jour." });
        }

        const faculty = { name, address, phone, email };

        const updatedFaculty = await faculteService.updateFaculte(req.params.id, faculty);
        res.json(updatedFaculty);

    } catch (error) {
        console.error("Error updating faculty:", error);
        if (error.message === "Faculté introuvable.") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
};

exports.deleteFaculte = async (req, res) => {
    if(req.params.id) {
        const faculte = await faculteService.deleteFaculte(req.params.id);
        res.json(faculte);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
}