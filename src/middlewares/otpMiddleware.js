const Otp = require('../models/Otp');
const { verifyToken } = require('../services/tokenService');

/**
 * Middleware ensuring user has verified OTP before resetting password
 */
const hasVerified = async (req, res, next) => {
    try {
        const verifyCookie = req.cookies.verify;
        if (!verifyCookie) {
            req.flash('error', 'Unauthorized access. Please initiate password reset.');
            return res.redirect('/auth/getmail');
        }

        const decoded = verifyToken(verifyCookie);
        if (!decoded || !decoded.email) {
            req.flash('error', 'Invalid verification session.');
            return res.redirect('/auth/getmail');
        }

        req.email = decoded.email;
        next();
    } catch (error) {
        console.error('OTP Verification Middleware Error:', error.message);
        res.clearCookie('verify');
        req.flash('error', 'Verification session expired. Please try again.');
        return res.redirect('/auth/getmail');
    }
};

/**
 * Middleware ensuring user has entered email and requested OTP before viewing OTP page
 */
const hasRequestedOtp = async (req, res, next) => {
    try {
        const emailCookie = req.cookies.email;
        if (!emailCookie) {
            req.flash('error', 'Please submit your registered email first.');
            return res.redirect('/auth/getmail');
        }

        const decoded = verifyToken(emailCookie);
        if (!decoded || !decoded.email) {
            return res.redirect('/auth/getmail');
        }

        req.email = decoded.email;
        next();
    } catch (error) {
        res.clearCookie('email');
        req.flash('error', 'Session expired. Please enter your email again.');
        return res.redirect('/auth/getmail');
    }
};

module.exports = { hasVerified, hasRequestedOtp };
