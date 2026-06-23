const mongoose = require('mongoose')


let RoadmapSchema = new mongoose.Schema({
 userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
    },
 goal:{
   type:String,
   required:true
 },
 level:{
    type:String,
    enum:["Beginner","Intermediate","Advanced"],
    required:true,
    default:"Beginner"
},
 hours:{
 type:Number,
 required:true
 },
 generatedroadmap:
 {
    type: mongoose.Schema.Types.Mixed,
    required: true
 },
 createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Roadmap',RoadmapSchema)