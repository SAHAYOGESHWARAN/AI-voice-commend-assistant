import React, { useState, useEffect } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;  // Enables continuous listening
recognition.interimResults = true;

const App = () => {
    const [command, setCommand] = useState('');
    const [listening, setListening] = useState(false);

    const startListening = () => {
        setListening(true);
        recognition.start();
    };

    const stopListening = () => {
        setListening(false);
        recognition.stop();
    };

    useEffect(() => {
        recognition.onresult = (event) => {
            const transcript = event.results[event.resultIndex][0].transcript;
            setCommand(transcript);
        };

        recognition.onend = () => {
            if (listening) recognition.start();  // Restart if still listening
        };

        return () => recognition.stop();
    }, [listening]);

    const handleCommandSubmit = async () => {
        if (command.trim() === '') return;

        try {
            const res = await axios.post('/api/commands', { command });
            console.log('AI Response:', res.data.response);
            setCommand('');  // Reset command input after processing
        } catch (error) {
            console.error('Error processing command:', error);
        }
    };

    return (
        <div>
            <button onClick={startListening}>Start Listening</button>
            <button onClick={stopListening}>Stop Listening</button>
            <p>Listening: {listening ? 'ON' : 'OFF'}</p>
            <p>Command: {command}</p>
            <button onClick={handleCommandSubmit}>Submit Command</button>
        </div>
    );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
// import other components (Dashboard, etc.)

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />  {/* Protected Route */}
            </Routes>
        </Router>
    );
}

export default App;
