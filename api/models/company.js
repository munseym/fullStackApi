const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee = require('./employee').schema;

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
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('Company', companySchema);