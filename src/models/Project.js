// src/models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    techStack: {
        type: [String], // Array of strings: ['React', 'Node.js', 'MongoDB']
        required: [true, 'At least one technology is required']
    },
    imageUrl: {
        type: String,
        default: ''
    },
    liveUrl: {
        type: String,
        default: ''
    },
    repoUrl: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);