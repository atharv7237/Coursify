const Roadmap = require('../models/Roadmap');
const User = require('../models/User');
const { generatePrompt } = require('../utils/promptTemplate');
const { generateRoadmapFromAI } = require('../services/aiService');

/**
 * Render Roadmap Generator Form (Home Page)
 */
const renderHome = (req, res) => {
    res.render('home');
};

/**
 * Render User's Roadmap Dashboard
 */
const renderDashboard = async (req, res) => {
    try {
        const roadmaps = await Roadmap.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.render('dashboard', { roadmaps });
    } catch (error) {
        console.error('Dashboard Error:', error);
        req.flash('error', 'Could not load your roadmaps.');
        res.redirect('/roadmap/home');
    }
};

/**
 * Render Detailed Roadmap View
 */
const renderRoadmapDetails = async (req, res) => {
    try {
        const { roadmapid } = req.params;
        const roadmap = await Roadmap.findById(roadmapid);

        if (!roadmap) {
            req.flash('error', 'Roadmap not found.');
            return res.redirect('/roadmap/dashboards');
        }

        if (roadmap.userId.toString() !== req.user._id.toString()) {
            req.flash('error', 'Access denied. You do not own this roadmap.');
            return res.redirect('/roadmap/dashboards');
        }

        res.render('roadmap', { roadmap });
    } catch (error) {
        console.error('Roadmap Details Error:', error);
        req.flash('error', 'Failed to load roadmap.');
        res.redirect('/roadmap/dashboards');
    }
};

/**
 * Handle AI Roadmap Generation
 */
const generateRoadmap = async (req, res) => {
    try {
        const { goal, level, hours, months } = req.body;

        if (!goal || !level || !hours || !months) {
            req.flash('error', 'Please fill in all fields.');
            return res.redirect('/roadmap/home');
        }

        const prompt = generatePrompt(goal, level, hours, months);
        const aiResponse = await generateRoadmapFromAI(prompt);

        if (!aiResponse || aiResponse.error) {
            req.flash('error', 'Failed to generate roadmap from AI. Please try again.');
            return res.redirect('/roadmap/home');
        }

        const newRoadmap = await Roadmap.create({
            userId: req.user._id,
            goal: goal.trim(),
            level,
            hours: Number(hours),
            generatedroadmap: aiResponse,
        });

        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { Roadmaps: newRoadmap._id } },
            { new: true }
        );

        req.flash('success', 'Roadmap generated successfully!');
        return res.redirect(`/roadmap/dashboards/${newRoadmap._id}`);
    } catch (error) {
        console.error('Generate Roadmap Error:', error);
        req.flash('error', error.message || 'An error occurred while generating roadmap.');
        return res.redirect('/roadmap/home');
    }
};

/**
 * Handle Roadmap Deletion
 */
const deleteRoadmap = async (req, res) => {
    try {
        const { deleteid } = req.params;
        const roadmap = await Roadmap.findById(deleteid);

        if (!roadmap) {
            req.flash('error', 'Roadmap not found.');
            return res.redirect('/roadmap/dashboards');
        }

        if (roadmap.userId.toString() !== req.user._id.toString()) {
            req.flash('error', 'Unauthorized: You cannot delete this roadmap.');
            return res.redirect('/roadmap/dashboards');
        }

        await Roadmap.findByIdAndDelete(deleteid);
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { Roadmaps: deleteid },
        });

        req.flash('success', 'Roadmap deleted successfully.');
        return res.redirect('/roadmap/dashboards');
    } catch (error) {
        console.error('Delete Roadmap Error:', error);
        req.flash('error', 'Could not delete roadmap.');
        return res.redirect('/roadmap/dashboards');
    }
};

module.exports = {
    renderHome,
    renderDashboard,
    renderRoadmapDetails,
    generateRoadmap,
    deleteRoadmap,
};
