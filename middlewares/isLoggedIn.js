const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports.isLoggedIn = async function (req,res,next) {
    try{
        if(!req.cookies.Token)
        {
            req.flash('error','Something Went Wrong Please Re login ....')
            return res.redirect('/auth')
        }
        else
        {
        let decoded = await jwt.verify(req.cookies.Token , process.env.Jwt)
        let user = await User.findById(decoded._id).select('-Password')
        if (!user) {
        req.flash('error','User Not Found Retry ....')
        return res.redirect("/auth");
        }               
        req.user = user
        next()
        }
    
    }catch(error)
    {
        console.log(error.message)
        req.flash('error','Something Went Wrong')
        return res.redirect("/auth");
    }
}