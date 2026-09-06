const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '10m', // Automatic expiration after 10 minutes
    },
});

module.exports = mongoose.model('OTP', otpSchema);
