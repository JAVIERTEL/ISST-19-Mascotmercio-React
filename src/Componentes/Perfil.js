import React, { useContext, useState } from 'react';
import { UserContext } from '../services/UserContext';
import ApiService from '../services/ApiService';
import { Link } from 'react-router-dom';

function Perfil() {
  const { user, setUser } = useContext(UserContext);
  

  const [username, setUsername] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');

  if (!user) {
    return <p>Por favor, <Link to="/Login">inicia sesión</Link>  para ver esta página.</p>;
  }
  

  const handleSave = async () => {
    try {
      const updatedUser = await ApiService.updateUser(username, email);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  return (
    <div>
      <h1>Perfil</h1>
      <form>
        <label>
          Nombre de usuario:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <button type="button" onClick={handleSave}>Guardar</button>
      </form>
    </div>
  );
}

export default Perfil;