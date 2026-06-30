const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {Token} = require('../utils/Token')
const Otp = require('../models/Otp')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

module.exports.Register = async (req,res) => {

    try {
    let {fullname , email , password } = req.body ;
    if (!fullname || !email || !password) {
            req.flash("error", "Please fill all fields");
            return res.redirect('/');
        }
    let user = await User.findOne({Email:email})
    if(user) 
    {
        req.flash('error',"User already exist ....")
        return res.redirect('/')
    }
    else{
    const hash = await bcrypt.hash(password, 10);
    const createUser = await User.create({
    FullName: fullname,
    Email: email,
    Password: hash
    });
    let token = await Token(createUser.Email , createUser._id)
    console.log(token)
    res.cookie('Token',token)
    req.user = createUser.Email
    res.redirect('/roadmap/home') 
    } 
    } catch (e) {
        console.log(e.message)
    }
    

    
}

module.exports.Login = async (req,res) => {
     try {
        let {email , password} = req.body ;
        if (!email || !password) {
            req.flash("error", "Please fill all fields");
            return res.redirect('/');
        }
        let user  = await User.findOne({Email:email})
        if(!user) 
    {
        req.flash('error',"No User Found")
        return res.redirect('/auth')
    }
        let check = await bcrypt.compare(password , user.Password)
        if(check){
            let token = await Token(user.Email , user._id)
            res.cookie("Token", token)
            req.user = user.Email 
            res.redirect("/roadmap/home")
        }
        else
        {
            req.flash('error',"Incorrect credentials")
            return res.redirect('/auth')
        }
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.Logout = async (req,res) => {
    try {
    res.clearCookie("Token");
    res.redirect('/')
        
    } catch (error) {
        console.log(error.message)
    }
   
}

module.exports.handleGenerateOtp = async (req,res) => {
    let {Email} = req.body
    try {
        const user = User.findOne({Email})
        if(!user) 
        {
            req.flash('error','No User found')
            return res.redirect('/')
        }

        const otp = Math.floor(Math.random()*999999 + 100000)
         console.log(otp)
        const newotp = Otp.create({
            otp,
            email:user.Email
        })

        const messgae = `Your Verification Code for the Password reset is ${otp}`
        const subject = 'Password Reset'
        const sendmail = await sendEmail(Email,subject,message)
        req.user = user
        res.redirect('/auth/verify')
    } catch (error) {
        
    }
}

module.exports.handleVerifyOtp = async ( req,res ) => {
    let {otp , Email } = req.body
    try {
    const otpRecord = await Otp.findOne({email:Email,otp})
    if(!otpRecord || Date.now > otpRecord.createdAt.getTime() + 60 * 60 * 1000)
    {
        return res.send('Error Occurred')
    }

    let token = jwt.sign({Email}, process.env.Jwt)
    res.cookie('verify',token)
    res.redirect('/auth/reset')
    } catch (error) {
        
    }

}

module.exports.handleResetPassword = async ( req , res )=> {
    let {Email , otp , newpass } = req.body
    try {
        
    } catch (error) {
        
    }
}