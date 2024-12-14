import React, { useState, useEffect } from 'react';
import { dinosaurs } from './data/dinosaurs';
import './App.css';

function App() {
  const [spanishVoice, setSpanishVoice] = useState(null);

  useEffect(() => {
    const getSpanishVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const spanish = voices.find(voice => 
        voice.lang.includes('es-MX') || 
        voice.lang.includes('es-ES') ||
        voice.lang.includes('es')
      );
      setSpanishVoice(spanish);
    };

    // Necesario para algunos navegadores
    speechSynthesis.onvoiceschanged = getSpanishVoice;
    getSpanishVoice();
  }, []);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }
    
    utterance.lang = 'es-MX';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleDinoClick = (dino) => {
    speak(`${dino.name}. ${dino.description}`);
  };

  return (
    <div className="App">
      <h1>Galería de Dinosaurios</h1>
      <div className="dinosaur-grid">
        {dinosaurs.map(dino => (
          <div key={dino.id} className="dinosaur-card">
            <img 
              src={dino.image} 
              alt={dino.name} 
              onClick={() => handleDinoClick(dino)}
              className="clickable-image"
            />
            <h2>{dino.name}</h2>
            <p>Período: {dino.period}</p>
            <p>Dieta: {dino.diet}</p>
            <p>Longitud: {dino.length}</p>
            <p>Peso: {dino.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;