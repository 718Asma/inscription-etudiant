const etudiantService = require("../services/etudiantService");

exports.getAllProfiles = async (req, res) => {
    try {
        const etudiants = await etudiantService.getAllProfiles();
        res.render("pages/etudiant", { profiles: etudiants });
    } catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des profils." });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "ID requis." });

        const etudiant = await etudiantService.getProfile(id);
        if (!etudiant) return res.status(404).json({ message: "Profil non trouvé." });

        res.json(etudiant);
        // res.render("pages/profile", { profile: etudiant });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Erreur lors de la récupération du profil." });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID de l'étudiant manquant." });
        }

        const { firstName, lastName, email, password } = req.body;
        if (!firstName && !lastName && !email && !password) {
            return res.status(400).json({ message: "Au moins un attribut est requis pour la mise à jour." });
        }

        const updatedProfile = await etudiantService.updateProfile(id, req.body);
        if (!updatedProfile) {
            return res.status(404).json({ message: "Profil non trouvé." });
        }

        res.json(updatedProfile);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du profil." });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "ID requis." });

        const etudiant = await etudiantService.deleteProfile(id);
        if (!etudiant) return res.status(404).json({ message: "Profil non trouvé." });

        res.json({ message: "Profil supprimé avec succès." });
    } catch (error) {
        console.error("Error deleting profile:", error);
        res.status(500).json({ message: "Erreur lors de la suppression du profil." });
    }
};
