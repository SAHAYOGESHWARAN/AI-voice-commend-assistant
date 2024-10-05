const { processCommand } = require('../services/nlpService');

exports.handleCommand = async (req, res) => {
    try {
        const { command } = req.body;
        const response = await processCommand(command);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ message: 'Error processing command' });
    }
};
