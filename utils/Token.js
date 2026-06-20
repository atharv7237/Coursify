const jwt = require('jsonwebtoken')

module.exports.Token = async(email,id) => {
    return jwt.sign({email:email , _id:id},process.env.Jwt)
}