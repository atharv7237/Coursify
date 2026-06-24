const { generatePrompt } = require("../utils/generatePrompt")
const { generate } = require('../utils/ai')
const marked = require('marked');
const Roadmap = require('../models/Roadmap');
const User = require("../models/User");
module.exports.home = async (req, res) => {
    res.render('home')
}

module.exports.dashboards = async (req, res) => {
    let user = req.user
    let roadmaps = await Roadmap.find({ userId: user._id })
    res.render('dashboard', { roadmaps })
}

module.exports.roadmap = async (req, res) => {
    let id = req.params.roadmapid
    let roadmap = await Roadmap.findOne({ _id: id })
    if (roadmap.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/roadmap/dashboards');
    }
    else {
        res.render('roadmap', { roadmap })
    }
}

module.exports.generate = async (req, res) => {
    try {
        let user = req.user;
        let { goal, level, hours, months } = req.body;
        if (!goal || !level || !hours || !months) {
            req.flash("error", "Please fill all fields");
            return res.redirect('/roadmap/home');
        }
        let prompt = generatePrompt(goal, level, hours, months).toString()
        let getResponse = await generate(prompt)
        console.log(getResponse)
        const formattedresponse = JSON.parse(getResponse)
        let roadmap = await Roadmap.create({
            userId: user._id,
            goal,
            level,
            hours,
            generatedroadmap: formattedresponse
        })

        let updateUser = await User.findByIdAndUpdate(user._id, { $push: { Roadmaps: roadmap._id } }, { new: true, runValidators: true })
        res.redirect(`/roadmap/dashboards/${roadmap._id}`)
    } catch (error) {
        req.flash('error', error.message)
        return res.redirect('/roadmap/home')
    }

}

module.exports.Delete = async (req, res) => {
    try {
        let id = await Roadmap.findByIdAndDelete({ _id: req.params.deleteid })
        let user = req.user
        let update = await User.findByIdAndUpdate(
            user._id,
            {
                $pull: {
                    Roadmaps: id._id // or req.params.deleteid
                }
            }
        );
        res.redirect('/roadmap/dashboards')
    }
    catch (error) {
        req.flash('error', error.message)
        return res.redirect('/roadmap/home')
    }
}