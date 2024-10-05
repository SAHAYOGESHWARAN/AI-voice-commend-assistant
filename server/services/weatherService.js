const axios = require('axios');

exports.getWeather = async (location) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await axios.get(url);
        const weather = response.data;
        return `It's currently ${weather.main.temp}°C with ${weather.weather[0].description} in ${location}.`;
    } catch (error) {
        throw new Error('Failed to retrieve weather data');
    }
};
