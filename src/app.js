const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');

const app = express();

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Core Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session & Flash Messages
const SESSION_SECRET = process.env.Jwt || process.env.JWT_SECRET || 'coursify_session_secret';
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);
app.use(flash());

// Global Template Locals (Flash & User state)
app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.currentUser = req.user || null;
    next();
});

// Cache Control Middleware
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

// Route Mounting
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/roadmap', roadmapRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).render('auth');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Application Error:', err.stack || err);
    req.flash('error', 'An unexpected error occurred. Please try again.');
    res.status(500).redirect('/');
});

module.exports = app;
