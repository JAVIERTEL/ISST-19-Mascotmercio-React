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
  const [esPropietario, setEsPropietario] = useState(false);


  const handleCrear = async(usuario, contrasena, email)  => {

    if (!email || !usuario || !contrasena) {
      alert('Por favor, completa todos los campos.');
      return; // No hacer nada si alguna caja de texto está vacía
  }
    try {

      if (esPropietario) {
        // Crea un propietario en lugar de un cliente
        await apiServiceInstance.crearPropietario(usuario, contrasena, email);
    } else {
        // Crea un cliente
        await apiServiceInstance.crearCliente(usuario, contrasena, email);
    }
      //await apiServiceInstance.crearCliente(usuario, contrasena, email);
      
  } catch (error) {
      console.error('Error creando cliente:', error);
  }
  }


  const isDisabled = !usuario || !contrasena || !email;

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
      <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="propietario" checked={esPropietario} onChange={() => setEsPropietario(!esPropietario)} />
                    <label className="form-check-label" htmlFor="propietario">Registrarse como propietario</label>
                </div>
      <Link to="/places">
        <Button variant="success" type="submit" onClick= {() => handleCrear(usuario, contrasena, email)} disabled={isDisabled}>Regístrate</Button>
        </Link>
      </div>
      <p className="mb-0 text-center">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  );
}

export default Registro;
