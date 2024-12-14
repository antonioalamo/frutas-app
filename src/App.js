import React, { useState, useEffect } from 'react';
import { fruits } from './data/fruits';
import './App.css';

function App() {
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [spanishVoice, setSpanishVoice] = useState(null);

  // Buscar la mejor voz en español al cargar el componente
  useEffect(() => {
    const getSpanishVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Buscamos voces en español, priorizando las de España o Latinoamérica
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
    utterance.rate = 0.3;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleFruitClick = (fruit) => {
    setSelectedFruit(fruit);
    speak(fruit.name);
  };

  const handleReadDescription = () => {
    if (selectedFruit) {
      speak(selectedFruit.description);
    }
  };

  return (
    <div className="app">
      <h1>Catálogo de Frutas</h1>
      
      <div className="buttons-container">
        {fruits.map(fruit => (
          <button
            key={fruit.id}
            style={{ backgroundColor: fruit.color }}
            className="fruit-button"
            onClick={() => handleFruitClick(fruit)}
          >
            {fruit.name}
          </button>
        ))}
      </div>

      {selectedFruit && (
        <div className="fruit-details">
          <img 
            src={selectedFruit.image} 
            alt={selectedFruit.name}
            className="fruit-image"
          />
          <h2>{selectedFruit.name}</h2>
          <p>{selectedFruit.description}</p>
          <button 
            onClick={handleReadDescription}
            className="read-description-button"
          >
            Leer descripción
          </button>
        </div>
      )}
    </div>
  );
}

export default App;