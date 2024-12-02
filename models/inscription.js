const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inscriptionSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Etudiant",
        required: true,
    },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculte",
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    uniYear: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected', 'archived'], 
        default: 'pending',
    },
    enrollmentDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { timestamps: true }); 

module.exports = mongoose.model("Inscription", inscriptionSchema);
