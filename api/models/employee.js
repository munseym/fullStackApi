const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    preferred_name: {
        type: String,
        required: false,
    },
    position: {
        type: String,
        required: false,
    },
    birthday: {
        type: Date,
        required: false,
    },
    email: {
        type: String,
        match: /\S+@\S+\.\S+/,
        required: true,
    },
});

module.exports = mongoose.model('Employee', employeeSchema);