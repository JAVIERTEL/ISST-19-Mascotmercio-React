import React from 'react';
import './App.css';
import Cabecera from './Cabecera'; // Importa el componente Cabecera
import HomePage from './HomePage'; // Importa el componente HomePage

function App() {
  return (
    <div className="App">
      <Cabecera />
      <HomePage/>
    </div>
  );
}
export default App;
