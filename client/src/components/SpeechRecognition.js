import React, { useState } from 'react';

const SpeechRecognition = () => {
    const [transcript, setTranscript] = useState('');

    const handleSpeech = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            setTranscript(speechToText);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };
    };

    return (
        <div>
            <button onClick={handleSpeech}>Start Speech Recognition</button>
            <p>{transcript}</p>
        </div>
    );
};

export default SpeechRecognition;
