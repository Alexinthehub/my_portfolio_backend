// src/routes/projectRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const router = express.Router();

// Public routes (anyone can view)
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected routes (only you with a valid token)
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;