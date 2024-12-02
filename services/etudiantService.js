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

exports.updateProfile = async (id, data) => {
    try {
        const profile = await Etudiant.findByIdAndUpdate(id, data, { new: true });
        return profile;
    } catch (error) {
        throw new Error(`Failed to update profile: ${error.message}`);
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