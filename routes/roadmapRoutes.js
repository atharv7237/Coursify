const express = require('express')
const { Register , Login , Logout} = require('../controllers/authcontroller')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const {home , dashboards , roadmap, generate , Delete } = require('../controllers/roadmapsController')
const router = express.Router()

router.get('/home', isLoggedIn , home)

router.get('/dashboards' , isLoggedIn , dashboards)

router.get('/dashboards/:roadmapid', isLoggedIn , roadmap)

router.post('/generate', isLoggedIn , generate )

router.post('/delete/:deleteid', isLoggedIn , Delete)

module.exports = router