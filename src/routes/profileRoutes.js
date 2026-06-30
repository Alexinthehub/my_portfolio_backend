// src/routes/profileRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/profileController');

const router = express.Router();

// Public route (anyone can view)
router.get('/', getProfile);

// Protected route (only you can update)
router.put('/', protect, updateProfile);

module.exports = router;