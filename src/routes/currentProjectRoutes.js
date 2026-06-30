// src/routes/currentProjectRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getCurrentProjects,
  getCurrentProjectById,
  createCurrentProject,
  updateCurrentProject,
  deleteCurrentProject,
  addStar,
} = require('../controllers/currentProjectController');

const router = express.Router();

// Public routes
router.get('/', getCurrentProjects);
router.get('/:id', getCurrentProjectById);
router.put('/:id/star', addStar); // anyone can star

// Protected routes (admin only)
router.post('/', protect, createCurrentProject);
router.put('/:id', protect, updateCurrentProject);
router.delete('/:id', protect, deleteCurrentProject);

module.exports = router;