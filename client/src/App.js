import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [command, setCommand] = useState('');
    const [response, setResponse] = useState('');

    const handleCommandSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/commands', { command });
            setResponse(res.data.response);
        } catch (err) {
            console.error('Error in command submission', err);
        }
    };

    return (
        <div className="App">
            <h1>Jarvis AI Assistant</h1>
            <form onSubmit={handleCommandSubmit}>
                <input 
                    type="text" 
                    value={command} 
                    onChange={(e) => setCommand(e.target.value)} 
                    placeholder="Enter your command" 
                />
                <button type="submit">Send</button>
            </form>
            {response && <div className="response">{response}</div>}
        </div>
    );
}

export default App;
