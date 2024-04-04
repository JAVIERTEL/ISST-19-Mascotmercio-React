import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import apiServiceInstance from '../services/ApiService';


function Registro() {

  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  //const [contrasena2, setContrasena2] = useState('');


  const handleCrearCliente = async(usuario, contrasena, email)  => {

    if (!email || !usuario || !contrasena) {
      alert('Por favor, completa todos los campos.');
      return; // No hacer nada si alguna caja de texto está vacía
  }
    try {
      
      await apiServiceInstance.crearCliente(usuario, contrasena, email);
      
  } catch (error) {
      console.error('Error creando cliente:', error);
  }
  }

  return (
    <div className="register-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Registro</h2>
      <div className="form-group mb-3">
        <label htmlFor="email" className="form-label">Dirección de correo electrónico:</label>
        <input type="text" id="email" className="form-control"  value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="username" className="form-label">Nombre de usuario:</label>
        <input type="text" id="username" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">Contraseña:</label>
        <input type="password" id="password" className="form-control" value={contrasena} onChange={(e) => setContrasena(e.target.value)}  />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password2" className="form-label">Repetir Contraseña:</label>
        <input type="password" id="password2" className="form-control" />
      </div>
      <div className="d-grid mb-3">
      <Link to="/places">
        <Button variant="success" type="submit" onClick= {() => handleCrearCliente(usuario, contrasena, email)}>Regístrate</Button>
        </Link>
      </div>
      <p className="mb-0 text-center">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  );
}

export default Registro;
