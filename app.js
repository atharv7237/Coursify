const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const path = require('path')
const authRoute = require('./routes/authRoutes')
require('dotenv').config()
const db = require('./config/db')

app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

app.use('/auth', authRoute)

app.listen(3000,()=>{
    console.log("Server started on port 3000")
})