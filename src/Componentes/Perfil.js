import React, { useContext, useState } from 'react';
import { UserContext } from '../services/UserContext';
import ApiService from '../services/ApiService';
import { Link } from 'react-router-dom';

// Importa el icono de usuario
import IconoUsuario from '../userIcon.png';

function Perfil() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');

  const handleSave = async () => {
    try {
      const updatedUser = await ApiService.updateUser(username, email);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '45vh' }}>
      <h1>Perfil de usuario</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>

        {/* Muestra el icono de usuario */}
        <img src={IconoUsuario} alt="Icono de Usuario" style={{ width: '100px', marginRight: '20px' }} />

        {/* Contenedor para los datos del usuario */}
        <div style={{ borderRadius: '5px', padding: '20px', borderRadius: '8px', border: '2px solid #008080', fontSize: '1.3rem' }}>

          {/* Muestra los datos del usuario */}
          <p><strong>Nombre de usuario:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>

        </div>
      </div>
    </div>
  );
}

export default Perfil;
