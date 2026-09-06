const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isLoggedIn, isGuest } = require('../middlewares/authMiddleware');
const { hasVerified, hasRequestedOtp } = require('../middlewares/otpMiddleware');

// Authentication Routes
router.post('/register', isGuest, authController.register);
router.post('/login', isGuest, authController.login);
router.get('/logout', isLoggedIn, authController.logout);

// Password Reset / OTP Routes (with aliases for standard naming)
router.get('/getmail', isGuest, authController.renderForgotPassword);
router.get('/forgot-password', isGuest, authController.renderForgotPassword);

router.post('/sendmail', isGuest, authController.handleGenerateOtp);
router.post('/send-otp', isGuest, authController.handleGenerateOtp);

router.get('/verify', hasRequestedOtp, authController.renderVerifyOtp);
router.get('/verify-otp', hasRequestedOtp, authController.renderVerifyOtp);
router.get('/resend-otp', hasRequestedOtp, authController.handleResendOtp);

router.post('/verify-otp', authController.handleVerifyOtp);

router.get('/reset', hasVerified, authController.renderResetPassword);
router.get('/reset-password', hasVerified, authController.renderResetPassword);

router.post('/reset-password', hasVerified, authController.handleResetPassword);

module.exports = router;
