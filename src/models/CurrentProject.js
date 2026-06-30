// src/models/CurrentProject.js
const mongoose = require('mongoose');

const CurrentProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['In Progress', 'Planning', 'Beta', 'Completed'],
    default: 'In Progress',
  },
  starCount: {
    type: Number,
    default: 0,
  },
  // 🆕 GitHub repo link for tracking progress
  repoUrl: {
    type: String,
    default: '',
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('CurrentProject', CurrentProjectSchema);