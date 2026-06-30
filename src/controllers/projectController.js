// src/controllers/projectController.js
const Project = require('../models/Project');

// --- GET all projects (sorted by order) ---
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching projects'
        });
    }
};

// --- GET a single project by ID ---
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error fetching project:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching project'
        });
    }
};

// --- CREATE a new project ---
const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error creating project:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// --- UPDATE a project ---
const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error updating project:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// --- DELETE a project ---
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting project:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting project'
        });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};