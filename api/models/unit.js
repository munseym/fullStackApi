const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company');

const unitSchema = new Schema({
    kind: {
        type: String,
        required: true,
    },
    floor: {
        type: Number,
        required: true,
    },
    special_monthly_offer: {
        type: Number,
        required: false,
    },
    company: {
        type: Company,
        required: false,
    }
});

module.exports = mongoose.model('Unit', unitSchema);