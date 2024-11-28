const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inscriptionSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Etudiant",
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
    enrollmentDate: {
        type: Date,
        required: true,
    },
    state: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected', 'archived'], 
    },
}, { timestamps: true }); 

module.exports = mongoose.model("Inscription", inscriptionSchema);
