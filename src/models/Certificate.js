// src/models/Certificate.js
const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  issuer: {
    type: String,
    required: [true, 'Issuer is required'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  imageUrl: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['Academics', 'Professional', 'Certification', 'Award'],
    default: 'Professional',
  },
  // 🆕 Link to verify the certificate
  verifyUrl: {
    type: String,
    default: '',
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);