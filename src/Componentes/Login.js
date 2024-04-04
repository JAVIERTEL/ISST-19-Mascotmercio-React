import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica para enviar la información de inicio de sesión al servidor
    console.log('Iniciando sesión con:', { username, password });
  };

  return (
    <div className="login-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label">Usuario:</label>
          <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="d-grid gap-2 mb-3">
          <Button variant="primary" type="submit">Iniciar sesión</Button>
        </div>
        <p className="mb-0 text-center">¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
      </form>
    </div>
  );
}

export default Login;
