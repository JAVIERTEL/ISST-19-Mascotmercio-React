import React from 'react';
import './App.css';
import Cabecera from './Componentes/Cabecera'; // Importa el componente Cabecera
import HomePage from './Componentes/HomePage'; // Importa el componente HomePage

function App() {
  return (
    <div className="App">
      <Cabecera />
      <HomePage/>
    </div>
  );
}
export default App;
