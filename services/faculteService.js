const Faculte = require('../models/faculte');

exports.getAllFacultes = async () => {
    try {
        const facultes = await Faculte.find();
        return facultes;
    } catch (error) {
        throw new Error(`Failed to retrieve facultes: ${error.message}`);
    }
};

exports.getFaculte = async (id) => {
    try {
        const faculte = await Faculte.findById(id);
        return faculte;
    } catch (error) {
        throw new Error(`Failed to retrieve faculte: ${error.message}`);
    }
};

exports.addFaculte = async (faculty) => {
    try {
        const newFaculte = new Faculte(faculty);
        await newFaculte.save();
        return newFaculte;
    } catch (error) {
        throw new Error(`Failed to add faculte: ${error.message}`);
    }
};

exports.updateFaculte = async (id, faculty) => {
    try {
        const existingFaculty = await Faculte.findById(id);
        if (!existingFaculty) {
            throw new Error("Faculté introuvable.");
        }

        const updatedFaculty = {
            name: faculty.name || existingFaculty.name,
            address: faculty.address || existingFaculty.address,
            phone: faculty.phone || existingFaculty.phone,
            email: faculty.email || existingFaculty.email
        };

        const faculte = await Faculte.findByIdAndUpdate(id, updatedFaculty, { new: true });
        return faculte;

    } catch (error) {
        throw new Error(`Échec de la mise à jour de la faculté: ${error.message}`);
    }
};

exports.deleteFaculte = async (id) => {
    try {
        const faculte = await Faculte.findByIdAndDelete(id);
        return faculte;
    } catch (error) {
        throw new Error(`Failed to delete faculte: ${error.message}`);
    }
};