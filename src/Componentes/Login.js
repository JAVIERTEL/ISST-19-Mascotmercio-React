import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import apiServiceInstance from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../services/UserContext'; // Importar UserContext
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [email, setEmail] = useState('');
  const { user, setUser } = useContext(UserContext); // Acceder a setUser
  const navigate = useNavigate();

  useEffect(() => {
    // Comprueba si hay información de usuario en el almacenamiento local al cargar la página
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let authenticationSuccessful = false; // Variable para controlar si la autenticación fue exitosa
  
    try {
      // Realiza una petición al servidor para autenticar al cliente
      const responseCliente = await apiServiceInstance.enviarDatosCliente(usuario, contraseña, email);
      if (responseCliente.status === true) {
        handleLoginSuccess(responseCliente, 'cliente');
        authenticationSuccessful = true; // Marca la autenticación como exitosa
        return;
      }
    } catch (error) {
      console.error('Error al autenticar cliente:', error);
    }
  
    try {
      // Realiza una petición al servidor para autenticar al propietario
      const responsePropietario = await apiServiceInstance.enviarDatosPropietario(usuario, contraseña, email);
      if (responsePropietario.status === true) {
        handleLoginSuccess(responsePropietario, 'propietario');
        authenticationSuccessful = true; // Marca la autenticación como exitosa
        return;
      }
    } catch (error) {
      console.error('Error al autenticar propietario:', error);
    }
  
    // Si ninguno de los intentos de autenticación fue exitoso, muestra el mensaje de error
    if (!authenticationSuccessful) {
      toast.error('Usuario o contraseña incorrectos.');
    }
  };
  

  const handleLoginSuccess = async (response, userType) => {
    try {
      let userEmail;
      if (userType === 'cliente') {
        userEmail = await apiServiceInstance.getEmailByCliente(usuario);
      } else if (userType === 'propietario') {
        userEmail = await apiServiceInstance.getEmailByPropietario(usuario);
      }
      // Actualiza el estado del usuario
      setUser({ name: usuario, email: userEmail });
      // Guarda el usuario en el almacenamiento local
      localStorage.setItem('user', JSON.stringify({ name: usuario, email: userEmail, type: userType }));
      toast.success(`Te has logueado correctamente como ${userType}.`);
      navigate('/Places'); // Redirecciona a /Places después de iniciar sesión
    } catch (error) {
      console.error(`Error al autenticar ${userType}:`, error);
      toast.error(`Error al autenticar ${userType}. Por favor, inténtalo de nuevo más tarde.`);
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
          <Button variant="primary" type="submit">Iniciar sesión</Button>
        </div>
        <p className="mb-0 text-center">¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
      </form>
    </div>
  );
}

export default Login;
