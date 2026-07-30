// src/routes/certificateRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} = require('../controllers/certificateController');

const router = express.Router();

// Public routes
router.get('/', getCertificates);
// router.get('/:id', getCertificateById); // Temporarily disabled – function not available

// Protected routes (admin only)
router.post('/', protect, createCertificate);
router.put('/:id', protect, updateCertificate);
router.delete('/:id', protect, deleteCertificate);

module.exports = router;