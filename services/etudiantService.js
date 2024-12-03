const Etudiant = require('../models/etudiant');

exports.getAllProfiles = async () => {
    try {
        const profiles = await Etudiant.find();
        return profiles;
    } catch (error) {
        throw new Error(`Failed to retrieve profiles: ${error.message}`);
    }
};

exports.getProfile = async (id) => {
    try {
        const profile = await Etudiant.findById(id);
        return profile;
    } catch (error) {
        throw new Error(`Failed to retrieve profile: ${error.message}`);
    }
};

exports.updateProfile = async (id, profileUpdates) => {
    try {
        const existingProfile = await Etudiant.findById(id);
        if (!existingProfile) {
            throw new Error("Profil introuvable.");
        }

        const updatedProfileData = {
            firstName: profileUpdates.firstName || existingProfile.firstName,
            lastName: profileUpdates.lastName || existingProfile.lastName,
            email: profileUpdates.email || existingProfile.email,
            password: profileUpdates.password || existingProfile.password
        };

        const updatedProfile = await Etudiant.findByIdAndUpdate(id, updatedProfileData, { new: true });
        return updatedProfile;
    } catch (error) {
        throw new Error(`Échec de la mise à jour du profil : ${error.message}`);
    }
};

exports.deleteProfile = async (id) => {
    try {
        const profile = await Etudiant.findByIdAndDelete(id);
        return profile;
    } catch (error) {
        throw new Error(`Failed to delete profile: ${error.message}`);
    }
};