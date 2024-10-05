const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const User = require('../models/user');

// Add a new task
router.post('/add', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.todos.push({ task: req.body.task, completed: false });
        await user.save();
        res.status(200).json({ message: 'Task added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding task' });
    }
});

// Get all tasks
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ todos: user.todos });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Mark task as complete
router.put('/complete/:taskId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const task = user.todos.id(req.params.taskId);
        task.completed = true;
        await user.save();
        res.status(200).json({ message: 'Task marked as complete' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking task as complete' });
    }
});
