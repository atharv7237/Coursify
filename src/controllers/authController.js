const bcrypt = require('bcrypt');
const User = require('../models/User');
const Otp = require('../models/Otp');
const { generateAuthToken, generateTemporaryToken, verifyToken } = require('../services/tokenService');
const { sendEmail } = require('../services/mailService');

/**
 * Render Auth (Login / Register) Page
 */
const renderAuthPage = (req, res) => {
    res.render('auth');
};

/**
 * Handle User Registration
 */
const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            req.flash('error', 'Please fill all required fields.');
            return res.redirect('/');
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ Email: normalizedEmail });

        if (existingUser) {
            req.flash('error', 'User already exists with this email.');
            return res.redirect('/');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            FullName: fullname.trim(),
            Email: normalizedEmail,
            Password: hashedPassword,
        });

        const token = generateAuthToken(newUser.Email, newUser._id);
        res.cookie('Token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        req.flash('success', 'Registration successful! Welcome to Coursify.');
        return res.redirect('/roadmap/home');
    } catch (error) {
        console.error('Registration Error:', error);
        req.flash('error', 'Something went wrong during registration.');
        return res.redirect('/');
    }
};

/**
 * Handle User Login
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            req.flash('error', 'Please provide both email and password.');
            return res.redirect('/');
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ Email: normalizedEmail });

        if (!user) {
            req.flash('error', 'No user found with this email.');
            return res.redirect('/');
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/');
        }

        const token = generateAuthToken(user.Email, user._id);
        res.cookie('Token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.redirect('/roadmap/home');
    } catch (error) {
        console.error('Login Error:', error);
        req.flash('error', 'An error occurred while logging in.');
        return res.redirect('/');
    }
};

/**
 * Handle User Logout
 */
const logout = (req, res) => {
    res.clearCookie('Token');
    req.flash('success', 'Logged out successfully.');
    return res.redirect('/');
};

/**
 * Render Forgot Password Email Form
 */
const renderForgotPassword = (req, res) => {
    res.render('forgotPassword');
};

/**
 * Generate and Send Password Reset OTP
 */
const handleGenerateOtp = async (req, res) => {
    try {
        const email = req.body.Email || req.body.email;

        if (!email) {
            req.flash('error', 'Please enter your email address.');
            return res.redirect('/auth/getmail');
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ Email: normalizedEmail }).select('-Password');

        if (!user) {
            req.flash('error', 'No registered account found with that email.');
            return res.redirect('/auth/getmail');
        }

        const otp = Math.floor(100000 + Math.random() * 999999);
        await Otp.create({
            otp,
            email: normalizedEmail,
        });

        const subject = 'Password Reset OTP - Coursify';
        const message = `Your verification code for password reset is: ${otp}\n\nThis OTP is valid for 10 minutes.`;

        await sendEmail(normalizedEmail, subject, message);

        const emailToken = generateTemporaryToken({ email: normalizedEmail }, '15m');
        res.cookie('email', emailToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });

        req.flash('success', 'Verification code sent to your email.');
        return res.redirect('/auth/verify');
    } catch (error) {
        console.error('Generate OTP Error:', error);
        req.flash('error', 'Could not send verification email. Please try again.');
        return res.redirect('/auth/getmail');
    }
};

/**
 * Render OTP Verification Page
 */
const renderVerifyOtp = (req, res) => {
    res.render('verifyOtp');
};

/**
 * Handle OTP Code Verification
 */
const handleVerifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const emailCookie = req.cookies.email;

        if (!emailCookie) {
            req.flash('error', 'Verification session expired. Please request a new OTP.');
            return res.redirect('/auth/getmail');
        }

        const decoded = verifyToken(emailCookie);
        const userEmail = decoded.email;
        const numericOtp = Number(otp);

        const otpRecord = await Otp.findOne({ email: userEmail, otp: numericOtp });

        if (!otpRecord) {
            req.flash('error', 'Invalid or expired verification code.');
            return res.redirect('/auth/verify');
        }

        const resetToken = generateTemporaryToken({ email: userEmail }, '15m');
        res.cookie('verify', resetToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });
        res.clearCookie('email');

        return res.redirect('/auth/reset');
    } catch (error) {
        console.error('Verify OTP Error:', error);
        req.flash('error', 'OTP verification failed. Please try again.');
        return res.redirect('/auth/verify');
    }
};

/**
 * Render Reset Password Page
 */
const renderResetPassword = (req, res) => {
    res.render('resetPassword');
};

/**
 * Handle New Password Submission
 */
const handleResetPassword = async (req, res) => {
    try {
        const { newpass } = req.body;

        if (!newpass || newpass.length < 6) {
            req.flash('error', 'Password must be at least 6 characters long.');
            return res.redirect('/auth/reset');
        }

        const verifyCookie = req.cookies.verify;
        if (!verifyCookie) {
            req.flash('error', 'Unauthorized reset attempt.');
            return res.redirect('/');
        }

        const decoded = verifyToken(verifyCookie);
        const userEmail = decoded.email;

        const hashedPassword = await bcrypt.hash(newpass, 10);
        await User.findOneAndUpdate(
            { Email: userEmail },
            { $set: { Password: hashedPassword } }
        );

        res.clearCookie('verify');
        await Otp.deleteMany({ email: userEmail });

        req.flash('success', 'Password reset successfully! You can now log in.');
        return res.redirect('/');
    } catch (error) {
        console.error('Reset Password Error:', error);
        req.flash('error', 'Failed to reset password. Please try again.');
        return res.redirect('/auth/reset');
    }
};

/**
 * Handle Resend OTP Request
 */
const handleResendOtp = async (req, res) => {
    try {
        const emailCookie = req.cookies.email;
        if (!emailCookie) {
            req.flash('error', 'Session expired. Please request OTP again.');
            return res.redirect('/auth/getmail');
        }

        const decoded = verifyToken(emailCookie);
        const userEmail = decoded.email;

        // Invalidate previous OTPs
        await Otp.deleteMany({ email: userEmail });

        // Generate new 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 999999);
        await Otp.create({
            otp,
            email: userEmail,
        });

        const subject = 'Your New Password Reset OTP - Coursify';
        const message = `Your new verification code is: ${otp}\n\nThis OTP is valid for 10 minutes.`;

        await sendEmail(userEmail, subject, message);

        req.flash('success', 'A new verification code has been sent to your email.');
        return res.redirect('/auth/verify');
    } catch (error) {
        console.error('Resend OTP Error:', error);
        req.flash('error', 'Failed to resend verification code. Please try again.');
        return res.redirect('/auth/verify');
    }
};

module.exports = {
    renderAuthPage,
    register,
    login,
    logout,
    renderForgotPassword,
    handleGenerateOtp,
    renderVerifyOtp,
    handleVerifyOtp,
    handleResendOtp,
    renderResetPassword,
    handleResetPassword,
};
