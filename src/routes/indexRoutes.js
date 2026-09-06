const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isGuest } = require('../middlewares/authMiddleware');

// Landing / Auth Page (Redirects to dashboard if already logged in)
router.get('/', isGuest, authController.renderAuthPage);

module.exports = router;
