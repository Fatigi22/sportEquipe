const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
    {
        sessionName: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        trainerName: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Available', 'Full', 'Not Available'],
            default: 'Available',
        },
    },
    { timestamps: true }
);

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
