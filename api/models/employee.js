const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    kind: {
        type: String,
        required: true,
    },
    floor: {
        type: Number,
        required: false,
    },
    special_monthly_offer: {
        type: Number,
        required: false,
    },
    company: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Employee', employeeSchema);