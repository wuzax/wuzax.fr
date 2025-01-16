import express from 'express';
import { Project } from '../models/Project.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a project
router.post('/', async (req, res) => {
  try {
    console.log('Received project data:', req.body);
    
    if (!req.body.title || !req.body.description || !req.body.image) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['title', 'description', 'image'],
        received: req.body 
      });
    }

    const project = new Project(req.body);
    console.log('Created project instance:', project);
    
    const savedProject = await project.save();
    console.log('Saved project:', savedProject);
    
    res.status(201).json(savedProject);
  } catch (error: unknown) {
    console.error('Error saving project:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export const projectRoutes = router;