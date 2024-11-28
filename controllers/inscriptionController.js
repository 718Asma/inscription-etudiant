const inscriptionService = require("../services/inscriptionService");

exports.getAllInscriptions = async (req, res) => {
    const inscriptions = await inscriptionService.getAllInscriptions();

    if (inscriptions) {
        res.render("pages/inscription", { enrollments: inscriptions });
    } else {
        res.status(500).json({ message: "Erreur lors de la récupération des profils." });
    }

};

exports.submitRequest = async (req, res) => {
    if (req.body.grade && req.body.uniYear && req.body.enrollmentDate && req.body.student) {
        const inscription = {
            grade: req.body.grade,
            uniYear: req.body.uniYear,
            enrollmentDate: req.body.enrollmentDate,
            student: req.body.student,
            state: "pending",
        };

        const savedInscription = await inscriptionService.submitRequest(inscription);
        res.json(savedInscription);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
};

exports.getInscription = async (req, res) => {
    if(req.params.id) {
        const inscription = await inscriptionService.getInscription(req.params.id);
        if (inscription) {
            res.json(inscription);
        } else {
            res.status(404).json({ message: "Inscription non trouvée." });
        }
    }
};

exports.validateRequest = async (req, res) => {
    if(req.params.id) {
        const inscription = await inscriptionService.validateRequest(req.params.id);

        if (inscription) {
            res.json(inscription);
        } else {
            res.status(404).json({ message: "Inscription non trouvée." });
        }
    }
};

exports.rejectRequest = async (req, res) => {
    if(req.params.id) {
        const inscription = await inscriptionService.rejectRequest(req.params.id);

        if (inscription) {
            res.json(inscription);
        } else {
            res.status(404).json({ message: "Inscription non trouvée." });
        }
    }
}

exports.archiveRequest = async (req, res) => {
    if(req.params.id) {
        const inscription = await inscriptionService.archiveRequest(req.params.id);

        if (inscription) {
            res.json(inscription);
        } else {
            res.status(404).json({ message: "Inscription non trouvée." });
        }
    }
}