const express = require('express')
const { Register , Login , Logout} = require('../controllers/authcontroller')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const router = express.Router()

router.get('/',(req,res)=>{
    res.clearCookie('Token')
    res.render('auth')
})

router.post('/register' , Register)

router.post('/login' , Login)

router.get('/logout',isLoggedIn ,Logout)
module.exports = router