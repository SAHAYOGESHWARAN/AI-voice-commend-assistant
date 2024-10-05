const express = require('express');
const router = express.Router();
const { handleCommand } = require('../controllers/commandsController');

// POST route for AI commands
router.post('/', handleCommand);

module.exports = router;
