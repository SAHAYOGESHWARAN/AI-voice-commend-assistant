const { processCommand } = require('../services/nlpService');
const { getWeather } = require('../services/weatherService');

exports.handleCommand = async (req, res) => {
    try {
        const { command } = req.body;

        // Simple NLP for detecting weather commands
        if (command.toLowerCase().includes('weather')) {
            const location = command.split('in')[1].trim();
            const weatherResponse = await getWeather(location);
            return res.status(200).json({ response: weatherResponse });
        }

        // Fallback to general NLP service
        const response = await processCommand(command);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ message: 'Error processing command' });
    }
};
