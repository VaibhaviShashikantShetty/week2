const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// ==========================================
// 1. GET ALL TASKS
// Endpoint: GET /api/tasks
// ==========================================
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tasks',
      error: error.message,
    });
  }
});

// ==========================================
// 2. GET SINGLE TASK BY ID
// Endpoint: GET /api/tasks/:id
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid task ID format',
      error: error.message,
    });
  }
});

// ==========================================
// 3. CREATE / ADD A NEW TASK
// Endpoint: POST /api/tasks
// Body: { "title": "Buy groceries", "priority": "high" }
// ==========================================
router.post('/', async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a task title',
      });
    }

    const newTask = await Task.create({
      title: title.trim(),
      description: description || '',
      priority: priority || 'medium',
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating task',
      error: error.message,
    });
  }
});

// ==========================================
// 4. UPDATE A TASK
// Endpoint: PUT /api/tasks/:id
// Body: { "completed": true, "title": "Updated Title" }
// ==========================================
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Returns updated task
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating task',
      error: error.message,
    });
  }
});

// ==========================================
// 5. DELETE A TASK
// Endpoint: DELETE /api/tasks/:id
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      deletedTask: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid task ID format',
      error: error.message,
    });
  }
});

module.exports = router;
