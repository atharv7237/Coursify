## Two models for the app - 

1.Users - 
{
    FullName:String,
    Email:String,
    Password:String,
    Roadmaps:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Roadmap"
    }
]
}

2.Roadmap - 

{
 Domain:String
 userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
    },
 goal:String
 level:{
    type:String,
    enum:["Beginner","Intermediate","Advanced"],
    default:"Beginner"
}
 hours:Number,
 roadmap:String,
 createdAt:{
        type:Date,
        default:Date.now
    }
}