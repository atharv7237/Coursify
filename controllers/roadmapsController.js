const { generatePrompt } = require("../utils/generatePrompt")
const {generate} = require('../utils/ai')
const marked = require('marked');
const Roadmap = require('../models/Roadmap');
const User = require("../models/User");
module.exports.home = async (req,res) => {
    res.render('home')
}

module.exports.dashboards = async (req,res) => {
    res.render('dashboard')
}

module.exports.roadmap = async (req,res) => {
    res.render('roadmap')
}

module.exports.generate = async (req,res) => {
    try {
    let user = req.user;
    let {goal,level,hours,months} = req.body ;
    let prompt = generatePrompt(goal,level,hours,months).toString()
    let getResponse = await generate(prompt)
    const formattedresponse = marked.parse(getResponse)
    let roadmap = await Roadmap.create({ 
        userId:user._id,
        goal,
        level,
        hours,
        roadmap:formattedresponse
    })
    
    let updateUser = await User.findByIdAndUpdate(user._id,{$push:{Roadmaps:roadmap._id}}, { new: true, runValidators: true })

    res.send('Updated')
    } catch (error) {
        console.log("Error",error)
    }
    
}