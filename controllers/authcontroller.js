const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports.Register = async (req,res) => {

    try {
    let {fullname , email , password } = req.body ;
    let user = await User.findOne({Email:email})
    console.log(user)
    if(user) return res.send('User already exists please use new email to register or login ...')
    
    let createUser = User.create({
        FullName:fullname,
        Email:email,
        Password:password
    })
    res.send('User created Succesfully')   
    } catch (e) {
        console.log(e.message)
    }
    

    
}

module.exports.Login = async (req,res) => {
    
}