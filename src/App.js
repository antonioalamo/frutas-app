import React, { useState } from 'react';
import { fruits } from './data/fruits';
import './App.css';

function App() {
  const [selectedFruit, setSelectedFruit] = useState(null);

  return (
    <div className="app">
      <h1>Catálogo de Frutas</h1>
      
      <div className="buttons-container">
        {fruits.map(fruit => (
          <button
            key={fruit.id}
            style={{ backgroundColor: fruit.color }}
            className="fruit-button"
            onClick={() => setSelectedFruit(fruit)}
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
        </div>
      )}
    </div>
  );
}

export default App; 