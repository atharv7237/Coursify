require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const path = require('path')
const authRoute = require('./routes/authRoutes')
const roadmapRoute = require('./routes/roadmapRoutes')
const db = require('./config/db')
const session = require('express-session');
const flash = require('connect-flash');

app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use(session({ secret: process.env.Jwt, resave: false, saveUninitialized: true }));
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use('/auth', authRoute)
app.use('/roadmap', roadmapRoute)

app.listen(3000,()=>{
    console.log("Server started on port 3000")
})