const express = require('express')
const { Register , Login } = require('../controllers/authcontroller')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('auth')
})

router.post('/register' , Register)
module.exports = router