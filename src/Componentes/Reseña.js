import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../services/UserContext';
import apiServiceInstance from '../services/ApiService';
import { Link } from 'react-router-dom';

function Reseña() {
  const { user, setUser } = useContext(UserContext);
  

  const [username, setUsername] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');

  const [autor, setAutor] = useState(username);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  
  const tiendaId = useParams().idTienda;

  if (!user) {
    return <p>Por favor, <Link to="/Login">inicia sesión</Link> para ver esta página.</p>;
  }
  
// Función para generar un UUID numérico único
const generarUUID = () => {
  return Math.floor(Math.random() * Date.now()).toString();
};



  console.log( autor, // autor
      titulo,
      contenido,
      tiendaId,
      username )
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resenaId = generarUUID();
      // Llama a la función enviarDatosResena del servicio ApiService
      await apiServiceInstance.enviarDatosResena(
        resenaId,
        autor, // autor
        titulo,
        contenido,
        tiendaId,
        username // idCliente
      );

    

      // Lógica adicional después de enviar los datos...
      console.log('Datos de reseña enviados exitosamente.');
    } catch (error) {
      console.error('Error enviando reseña:', error);
    }
    
  
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="contenido">Contenido:</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(event) => setContenido(event.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
          ></textarea>
        </div>
        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>Enviar</button>
      </form>
    </div>
  );
}

export default Reseña;
