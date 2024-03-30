import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Registro() {
  return (
    <div className="register-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Registro</h2>
      <div className="form-group mb-3">
        <label htmlFor="email" className="form-label">Dirección de correo electrónico:</label>
        <input type="text" id="email" className="form-control" />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="username" className="form-label">Nombre de usuario:</label>
        <input type="text" id="username" className="form-control" />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">Contraseña:</label>
        <input type="password" id="password" className="form-control" />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password2" className="form-label">Repetir Contraseña:</label>
        <input type="password" id="password2" className="form-control" />
      </div>
      <div className="d-grid mb-3">
        <Button variant="success" type="submit">Regístrate</Button>
      </div>
      <p className="mb-0 text-center">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  );
}

export default Registro;
