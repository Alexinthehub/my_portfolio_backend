// src/models/Profile.js
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    // Personal Info
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    about: { type: String, default: '' }, // NEW: Longer "About Me" section
    avatar: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },

    // NEW: Skills & Languages (Arrays)
    skills: { type: [String], default: [] },


    // Social Links
socialLinks: {
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  discord: { type: String, default: '' },
  email: { type: String, required: true },
}
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);