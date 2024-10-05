const axios = require('axios');

exports.getLatestNews = async () => {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        const articles = response.data.articles.slice(0, 5); // Get top 5 articles
        return articles.map((article, index) => `${index + 1}. ${article.title}`).join('\n');
    } catch (error) {
        throw new Error('Failed to retrieve news');
    }
};
