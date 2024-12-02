const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user');

const etudiantSchema = new Schema({
    // firstName: {
    //     type: String,
    //     required: true,
    // },
    // lastName: {
    //     type: String,
    //     required: true,
    // },
    birthday: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    // email: {
    //     type: String,
    //     required: true,
    // },
    // password: {
    //     type: String,
    //     required: true,
    // },
});

const Etudiant = User.discriminator('Etudiant', etudiantSchema);
module.exports = Etudiant;