// src/controllers/certificateController.js
const Certificate = require('../models/Certificate');

// --- GET all certificates (public) ---
const getCertificates = async (req, res) => {
  try {
    // ✅ ONLY return these fields – exclude description, notes, recipient, etc.
    const certificates = await Certificate.find()
      .select('title issuer date category imageUrl verifyUrl')
      .sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.error('Error fetching certificates:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching certificates',
    });
  }
};

// --- CREATE certificate (admin only) ---
const createCertificate = async (req, res) => {
  try {
    // Only allow specific fields
    const { title, issuer, date, category, imageUrl, verifyUrl } = req.body;
    const certificate = await Certificate.create({
      title,
      issuer,
      date,
      category,
      imageUrl,
      verifyUrl,
    });
    res.status(201).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    console.error('Error creating certificate:', error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --- UPDATE certificate (admin only) ---
const updateCertificate = async (req, res) => {
  try {
    // Only allow specific fields to be updated
    const { title, issuer, date, category, imageUrl, verifyUrl } = req.body;
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      { title, issuer, date, category, imageUrl, verifyUrl },
      { new: true, runValidators: true }
    );
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found',
      });
    }
    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    console.error('Error updating certificate:', error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --- DELETE certificate (admin only) ---
const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Certificate deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting certificate:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting certificate',
    });
  }
};

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};