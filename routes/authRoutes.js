const express = require('express')
const { Register , Login , Logout, handleGenerateOtp, handleVerifyOtp, handleResetPassword} = require('../controllers/authcontroller')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const router = express.Router()
const { hasverified } = require('../middlewares/otpverification')


router.post('/register' , Register)

router.post('/login' , Login)

router.get('/logout',isLoggedIn ,Logout)

router.get('/getmail' , async(req,res)=>{
    res.render('Verify')
})

router.post('/sendmail' , handleGenerateOtp)

router.get('/verify' , async(req,res) => {
    res.render('verifyotp')
})

router.post('/verify-otp' , handleVerifyOtp)

router.get('/reset' , hasverified , async (req,res) => {
    res.render('resetpass')
})

router.post('/reset-password' , hasverified ,handleResetPassword)

module.exports = router