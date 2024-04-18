import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import apiServiceInstance from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza una petición al servidor para autenticar al cliente
      const responseCliente = await apiServiceInstance.enviarDatosCliente(usuario, contraseña,email);
      console.log(responseCliente)
    } catch (error) {
      console.error('Error al autenticar cliente:', error);
    
    }
  
    try {
      // Realiza una petición al servidor para autenticar al propietario
      const responsePropietario = await apiServiceInstance.enviarDatosPropietario(usuario, contraseña,email);
      console.log(responsePropietario)
    } catch (error) {
      console.error('Error al autenticar propietario:', error);
    }
  
  };
  

  return (
    <div className="login-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label">Usuario:</label>
          <input type="text" id="username" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input type="password" id="password" className="form-control" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
        </div>
        <div className="d-grid gap-2 mb-3">
        <Link to="/places">
          <Button variant="primary" type="submit" onClick={handleSubmit}>Iniciar sesión</Button>
        </Link>
        </div>
        <p className="mb-0 text-center">¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
      </form>
    </div>
  );
}

export default Login;
