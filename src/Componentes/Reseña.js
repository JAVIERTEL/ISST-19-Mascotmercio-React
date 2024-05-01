import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import apiServiceInstance from '../services/ApiService';


function Registro() {

  const [autor, setAutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');


  //Función que genera un ID diferente para cada reseña
  function generateId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }
  

  const handleCrear = async(autor, titulo, contenido)  => {
    try {
      const newId = generateId();
      await apiServiceInstance.crearResena(newId, autor, titulo, contenido);

    } catch (error) {
      console.error('Error creando reseña:', error);
  }
  }

  return (
    <div className="register-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Añadir una reseña</h2>
      <div className="form-group mb-3">
        <label>Autor</label>
        <input type="text" id="autor" className="form-control"value={autor} onChange={(e) => setAutor(e.target.value)} required />
      </div>
      <div className="form-group mb-3">
        <label>Titulo</label>
        <input type="text" id="titulo" className="form-control"value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      </div>
      <div className="form-group mb-3">
        <label>Contenido</label>
        <input type="text" id="contenido" className="form-control"value={contenido} onChange={(e) => setContenido(e.target.value)}required />
      </div>
      <div className="d-grid mb-3">
        <Button variant="success" type="submit"onClick= {() => handleCrear(autor, titulo, contenido)}>Añadir reseña</Button>
      </div>
    </div>
  );
}

export default Registro;
