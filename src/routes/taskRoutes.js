const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// Protect all routes
router.use(auth);

// Get all tasks
router.get('/', taskController.getTasks);

// Create a task
router.post('/', taskController.createTask);

// Update a task
router.patch('/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router; 