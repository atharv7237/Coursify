const jwt = require('jsonwebtoken')
const Otp = require('../models/Otp')

module.exports.hasverified = async function (req,res,next) {
    try{
        if(!req.cookies.verify)
        {
            req.flash('error','Something Went Wrong Please Re login ....')
            return res.redirect('/')
        }
        else
        {
        let decoded = await jwt.verify(req.cookies.verify , process.env.Jwt)
        let user = await Otp.findOne({email:decoded.email}).select('-otp')
        if (!user) {
        req.flash('error','User Not Found Retry ....')
        return res.redirect("/");
        } 
        req.email = user.email;          
        next();
        }
    
    }catch(error)
    {
        console.log(error.message)
        req.flash('error','Something Went Wrong')
        return res.redirect("/");
    }
}