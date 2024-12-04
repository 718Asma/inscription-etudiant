const mongoose = require('mongoose');
const Student = require('../models/etudiant');
const University = require('../models/faculte');
const inscriptionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    state: { type: String, enum: ['pending', 'approved', 'rejected', 'archived'], default: 'pending' },
    enrollmentDate: { type: Date, default: Date.now },
});

inscriptionSchema.pre('save', async function (next) {
    try {
        const studentExists = await Student.exists({ _id: this.student });
        if (!studentExists) {
            throw new Error(`Student with ID ${this.student} does not exist`);
        }

        const universityExists = await University.exists({ _id: this.university });
        if (!universityExists) {
            throw new Error(`University with ID ${this.university} does not exist`);
        }

        next();
    } catch (error) {
        next(error);
    }
});

inscriptionSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const update = this.getUpdate();

        if (update && (update.student || update.university)) {
            if (update.student) {
                const studentExists = await Student.exists({ _id: update.student });
                if (!studentExists) {
                    throw new Error(`Student with ID ${update.student} does not exist`);
                }
            }

            if (update.university) {
                const universityExists = await University.exists({ _id: update.university });
                if (!universityExists) {
                    throw new Error(`University with ID ${update.university} does not exist`);
                }
            }
        }

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Inscription', inscriptionSchema);
