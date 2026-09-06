const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        goal: {
            type: String,
            required: [true, 'Goal is required'],
            trim: true,
        },
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            required: true,
            default: 'Beginner',
        },
        hours: {
            type: Number,
            required: [true, 'Daily study hours are required'],
            min: 1,
            max: 24,
        },
        generatedroadmap: {
            type: mongoose.Schema.Types.Mixed,
            required: [true, 'Generated roadmap data is required'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Roadmap', RoadmapSchema);
