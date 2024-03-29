import React, { useState } from 'react';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Link } from 'react-router-dom/dist';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica para enviar la información de inicio de sesión al servidor
    console.log('Iniciando sesión con:', { username, password });
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar sesión</button>
        <Link to="/registro">
         <Button className=".grey-button">Regístrate</Button>
        </Link>
                        
      </form>
    </div>
  );
}

export default Login;
