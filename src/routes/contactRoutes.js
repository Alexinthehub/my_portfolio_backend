// src/routes/contactRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const {
  sendMessage,
  getMessages,
  deleteMessage,
  markAsRead
} = require('../controllers/contactController');

const router = express.Router();

// Public route (anyone can send a message)
router.post('/', sendMessage);

// Protected routes (only you)
router.get('/', protect, getMessages);
router.delete('/:id', protect, deleteMessage);
router.put('/:id/read', protect, markAsRead);

module.exports = router;