const express = require('express')
const { Register , Login , Logout} = require('../controllers/authcontroller')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const router = express.Router()


router.post('/register' , Register)

router.post('/login' , Login)

router.get('/logout',isLoggedIn ,Logout)
module.exports = router