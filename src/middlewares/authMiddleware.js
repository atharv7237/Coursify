const User = require('../models/User');
const { verifyToken } = require('../services/tokenService');

/**
 * Route protection middleware - requires authenticated session
 */
const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.Token;
        if (!token) {
            req.flash('error', 'Please log in to access this page.');
            return res.redirect('/');
        }

        const decoded = verifyToken(token);
        const user = await User.findById(decoded._id).select('-Password');

        if (!user) {
            res.clearCookie('Token');
            req.flash('error', 'User account not found. Please log in again.');
            return res.redirect('/');
        }

        req.user = user;
        res.locals.currentUser = user;
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error.message);
        res.clearCookie('Token');
        req.flash('error', 'Session expired or invalid. Please log in.');
        return res.redirect('/');
    }
};

/**
 * Guest middleware - redirects already logged in users away from auth pages
 */
const isGuest = async (req, res, next) => {
    try {
        const token = req.cookies.Token;
        if (token) {
            const decoded = verifyToken(token);
            const user = await User.findById(decoded._id);
            if (user) {
                return res.redirect('/roadmap/home');
            }
        }
        next();
    } catch {
        next();
    }
};

module.exports = { isLoggedIn, isGuest };
