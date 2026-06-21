const mongoose = require('mongoose')


let RoadmapSchema = new mongoose.Schema({
 userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
    },
 goal:String,
 level:{
    type:String,
    enum:["Beginner","Intermediate","Advanced"],
    default:"Beginner"
},
 hours:Number,
 roadmap:String,
 createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Roadmap',RoadmapSchema)