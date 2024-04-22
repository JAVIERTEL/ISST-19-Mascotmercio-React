import React, { useContext } from 'react';
import { UserContext } from '../services/UserContext'; // Asegúrate de importar UserContext

function Perfil() {
  const { user } = useContext(UserContext); // Acceder al estado del usuario

  // Comprobar si el usuario ha iniciado sesión
  if (!user) {
    return <p>Por favor, inicia sesión para ver esta página.</p>;
  }

  return (
    <div>
      <h1>Perfil</h1>
      <p>Nombre de usuario: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Perfil;