const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {Token} = require('../utils/Token')

module.exports.Register = async (req,res) => {

    try {
    let {fullname , email , password } = req.body ;
    let user = await User.findOne({Email:email})
    if(user) 
    {
        req.flash('error',"User already exist ....")
        return res.redirect('/auth')
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
    res.redirect('/auth')
        
    } catch (error) {
        console.log(error.message)
    }
   
}