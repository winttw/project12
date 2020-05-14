const mongoose = require('mongoose');
const { Schema } = mongoose;

const company_schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        default: '',
    },
    created_at: {
        type: Number,
        default: Date.now(),
        required: true
    },
    updated_at: {
        type: Number,
        default: Date.now(),
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    contact: {
        type: String,
        default: ''
    }
})

const Company = mongoose.model('Company', company_schema)

exports.Company = Company;