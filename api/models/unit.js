const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company').schema;

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
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Unit', unitSchema);