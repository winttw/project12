const mongoose = require('mongoose');
const { Schema } = mongoose;

const user_schema = new Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    display_name: {
        type: String,
        trim: true,
        default: function () { return this.username.split(' ').join('_') },
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    registration_ip: {
        type: String,
        trim: true,
        required: true,
        default: "0.0.0.0"
    },
    account_type: {
        type: Number,
        required: true,
        default: 0
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    created_at: {
        type: Number,
        default: Date.now(),
        required: true
    },
    last_login: {
        type: Number,
        required: true,
        default: Date.now()
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        required: true,
        default: 0
    },
    tasks_complete: [{
        type: String,
        default: ''
    }],
    tasks_in_progress: [{
        type: String,
        default: ''
    }],
    tasks_not_yet_started: [{
        type: String,
        default: ''
    }],
    total_time: {
        type: Number,
        default: 0
    },
    overtime_time: {
        type: Number,
        default: 0
    },
    time_windows: [{
        shift_start: {
            type: Number,
            required: true
        },
        shift_end: {
            type: Number,
            default: 0
        },
        lunch_start: {
            type: Number,
            default: 0
        },
        lunch_end: {
            type: Number,
            default: 0
        },
        status: {
            type: Number,
            default: 0
        }
    }],
    group: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        default: ''
    }
})

const User = mongoose.model('User', user_schema)

exports.User = User;