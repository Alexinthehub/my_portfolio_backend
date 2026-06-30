// src/controllers/currentProjectController.js
const CurrentProject = require('../models/CurrentProject');

// --- GET all current projects (public) ---
const getCurrentProjects = async (req, res) => {
  try {
    const projects = await CurrentProject.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching current projects:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching current projects',
    });
  }
};

// --- GET a single current project (public) ---
const getCurrentProjectById = async (req, res) => {
  try {
    const project = await CurrentProject.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error fetching project:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching project',
    });
  }
};

// --- CREATE a new current project (admin only) ---
const createCurrentProject = async (req, res) => {
  try {
    const project = await CurrentProject.create(req.body);
    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error creating current project:', error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --- UPDATE project status (admin only) ---
const updateCurrentProject = async (req, res) => {
  try {
    const project = await CurrentProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error updating project:', error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --- DELETE a current project (admin only) ---
const deleteCurrentProject = async (req, res) => {
  try {
    const project = await CurrentProject.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting project',
    });
  }
};

// --- ADD STAR (increment starCount) ---
const addStar = async (req, res) => {
  try {
    const project = await CurrentProject.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    project.starCount += 1;
    await project.save();
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error adding star:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while adding star',
    });
  }
};

module.exports = {
  getCurrentProjects,
  getCurrentProjectById,
  createCurrentProject,
  updateCurrentProject,
  deleteCurrentProject,
  addStar,
};