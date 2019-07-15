const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee = require('./employee');

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    contact_email: {
        type: String,
        match: /\S+@\S+\.\S+/,
        required: true,
    },
    employees: [Employee]
});

module.exports = mongoose.model('Company', companySchema);