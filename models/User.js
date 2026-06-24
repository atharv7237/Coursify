const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
FullName:{
    type:String,
    required:true
},
    Email:{
        type:String,
        required:true
    },
    Password:{
    type:String,
    required:true
    },
    Roadmaps:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Roadmap"
    }
]
})

module.exports = mongoose.model('User',UserSchema)