import React from 'react';
import { dinosaurs } from './data/dinosaurs';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Galería de Dinosaurios</h1>
      <div className="dinosaur-grid">
        {dinosaurs.map(dino => (
          <div key={dino.id} className="dinosaur-card">
            <img src={dino.image} alt={dino.name} />
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