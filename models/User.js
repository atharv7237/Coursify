const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    FullName:String,
    Email:String,
    Password:String,
    Roadmaps:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Roadmap"
    }
]
})

module.exports = mongoose.model('User',UserSchema)