const axios = require('axios');

exports.processCommand = async (command) => {
    try {
        const result = await axios.post('https://api.openai.com/v1/completions', {
            prompt: command,
            model: "text-davinci-003",
            max_tokens: 150,
        }, {
            headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
        });
        
        return result.data.choices[0].text.trim();
    } catch (error) {
        throw new Error('Failed to process command');
    }
};
