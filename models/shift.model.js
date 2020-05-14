const mongoose = require('mongoose');
const { Schema } = mongoose;

const shift_schema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        default: '',
    },
    starts_at: {
        type: Number,
        default: Date.now(),
        required: true
    },
    ends_at: {
        type: Number,
        default: Date.now()+28800000, //8 hours extra from creation date
        required: true
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Shift = mongoose.model('Shift', shift_schema)

exports.Shift = Shift;