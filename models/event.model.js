const mongoose = require('mongoose');
const { Schema } = mongoose;

const event_schema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
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
    time_alloted: {
        task_start: {
            type: Number,
            default: Date.now()
        },
        task_end: {
            type: Number,
            default: Date.now() + 604800000
        }
    }
})

const Event = mongoose.model('Event', event_schema)

exports.Event = Event;