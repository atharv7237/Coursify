const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        FullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
        },
        Email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        Password: {
            type: String,
            required: [true, 'Password is required'],
        },
        Roadmaps: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Roadmap',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', UserSchema);
