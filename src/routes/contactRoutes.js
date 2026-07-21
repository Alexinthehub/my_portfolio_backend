const express = require('express');
const { protect } = require('../middleware/auth');
const {
  sendMessage,
  getMessages,
  deleteMessage,
  markAsRead
} = require('../controllers/contactController');

const router = express.Router();

// ✅ PUBLIC — anyone can send a message
router.post('/', sendMessage);  

// 🔒 PROTECTED — only admin can view/delete messages
router.get('/', protect, getMessages);
router.delete('/:id', protect, deleteMessage);
router.put('/:id/read', protect, markAsRead);

module.exports = router;