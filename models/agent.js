const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user');

const agentSchema = new Schema({
    // firstName: {
    //     type: String,
    //     required: true,
    // },
    // lastName: {
    //     type: String,
    //     required: true,
    // },
    // email: {
    //     type: String,
    //     required: true,
    // },
    // password: {
    //     type: String,
    //     required: true,
    // },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
        required: true,
    },
});

const Agent = User.discriminator('Agent', agentSchema);
module.exports = Agent;