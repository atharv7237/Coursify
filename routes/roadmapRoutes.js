const express = require('express')
const { Register , Login , Logout} = require('../controllers/authcontroller')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const {home , dashboards , roadmap, generate } = require('../controllers/roadmapsController')
const router = express.Router()

router.get('/home', isLoggedIn , home)

router.get('/dashboards' , isLoggedIn , dashboards)

router.get('/:roadmapid', isLoggedIn ,roadmap)

router.post('/generate', isLoggedIn , generate )

module.exports = router