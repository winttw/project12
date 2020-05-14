const mongoose = require('mongoose');
const { Schema } = mongoose;

const utility_schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: Array,
        default: [],
        required: true
    },
})

const Utility = mongoose.model('Utility', utility_schema)

exports.Utility = Utility;