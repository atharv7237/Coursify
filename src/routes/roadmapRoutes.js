const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');
const { isLoggedIn } = require('../middlewares/authMiddleware');

// All roadmap routes are protected by authMiddleware
router.use(isLoggedIn);

router.get('/home', roadmapController.renderHome);
router.get('/dashboards', roadmapController.renderDashboard);
router.get('/dashboards/:roadmapid', roadmapController.renderRoadmapDetails);
router.post('/generate', roadmapController.generateRoadmap);
router.post('/delete/:deleteid', roadmapController.deleteRoadmap);

module.exports = router;
