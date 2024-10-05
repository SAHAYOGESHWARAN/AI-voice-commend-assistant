const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

const handleCommandSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post('/api/commands', { command }, { headers: { 'x-auth-token': token } });
        setResponse(res.data.response);
    } catch (err) {
        console.error('Error in command submission', err);
    }
};
