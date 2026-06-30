// src/controllers/certificateController.js
const Certificate = require('../models/Certificate');

// --- GET all certificates (public) ---
const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ date: -1 });
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

// --- GET a single certificate (public) ---
const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
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
    console.error('Error fetching certificate:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching certificate',
    });
  }
};

// --- CREATE a new certificate (admin only) ---
const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
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

// --- UPDATE a certificate (admin only) ---
const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
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

// --- DELETE a certificate (admin only) ---
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
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};