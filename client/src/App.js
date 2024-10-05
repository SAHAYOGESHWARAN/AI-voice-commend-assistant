import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Login';  // Adjust the path according to your folder structure
import Dashboard from '../components/Dashboard';  // Assuming you have a Dashboard component

// SpeechRecognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;  // Enables continuous listening
recognition.interimResults = true;

const App = () => {
    const [command, setCommand] = useState('');
    const [listening, setListening] = useState(false);
    const navigate = useNavigate();  // For routing within the app

    // Start listening to voice commands
    const startListening = () => {
        setListening(true);
        recognition.start();
    };

    // Stop listening to voice commands
    const stopListening = () => {
        setListening(false);
        recognition.stop();
    };

    useEffect(() => {
        // Handle the voice recognition result
        recognition.onresult = (event) => {
            const transcript = event.results[event.resultIndex][0].transcript;
            setCommand(transcript);  // Update the command state with recognized text
        };

        // Auto-restart recognition if listening is still enabled
        recognition.onend = () => {
            if (listening) recognition.start();
        };

        // Cleanup on component unmount
        return () => recognition.stop();
    }, [listening]);

    // Submit recognized command to backend
    const handleCommandSubmit = async () => {
        if (command.trim() === '') return;  // Ignore if the command is empty

        try {
            const res = await axios.post('/api/commands', { command });  // Send command to the server
            console.log('AI Response:', res.data.response);  // Log the response from backend
            setCommand('');  // Clear the command after submission
        } catch (error) {
            console.error('Error processing command:', error);
        }
    };

    return (
        <div>
            <h1>Jarvis AI Assistant</h1>
            {/* Voice Recognition Section */}
            <button onClick={startListening}>Start Listening</button>
            <button onClick={stopListening}>Stop Listening</button>
            <p>Listening: {listening ? 'ON' : 'OFF'}</p>
            <p>Command: {command}</p>
            <button onClick={handleCommandSubmit}>Submit Command</button>

            {/* Routing Section */}
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />  {/* Protected Route */}
                </Routes>
            </Router>
        </div>
    );
};

export default App;
