import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../services/UserContext';
import apiServiceInstance from '../services/ApiService';
import { Link } from 'react-router-dom';
import UserIcon from '../userIcon.png';

function Reseña() {
  const { user } = useContext(UserContext);

  const [username, setUsername] = useState(user ? user.name : '');
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [reseñas, setReseñas] = useState([]);
  const [tienda, setTienda] = useState(null);
  const tiendaId = useParams().idTienda;

  const obtenerReseñas = async () => {
    try {
      const response = await apiServiceInstance.obtenerReseñas();
      const reseñasFiltradas = response.filter(resena => resena.tienda.idTienda == tiendaId);
      setReseñas(reseñasFiltradas);
    } catch (error) {
      console.error('Error obteniendo reseñas:', error);
    }
  };

  useEffect(() => {
    obtenerReseñas();
  }, [tiendaId]);

  const limpiarFormulario = () => {
    setTitulo('');
    setContenido('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resenaId = Math.floor(Math.random() * Date.now()).toString();
      await apiServiceInstance.enviarDatosResena(
        resenaId,
        username,
        titulo,
        contenido,
        tiendaId,
        username
      );
      console.log('Datos de reseña enviados exitosamente.');
      limpiarFormulario();
      obtenerReseñas(); // Llama a obtenerReseñas después de enviar la reseña
    } catch (error) {
      console.error('Error enviando reseña:', error);
    }
  };

  if (!user) {
    return <p style={{ fontSize: '1.2rem' }}>Por favor, <Link to="/Login">inicia sesión</Link> para ver esta página.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px' }}>
      {user.type !== 'propietario' && (
        <form onSubmit={handleSubmit} style={{ width: '45%', marginRight: '20px', fontSize: '1.2rem' }}>
          <h2>Deja tu reseña de la tienda <em>{reseñas.length > 0 && reseñas[0].tienda.nombre}</em></h2>
          <div style={{ marginBottom: '15px', marginTop: '20px' }}>
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="contenido">Cuéntanos cómo fue tu experiencia:</label>
            <textarea
              id="contenido"
              value={contenido}
              onChange={(event) => setContenido(event.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', background: '#f5f5f5' }}
            ></textarea>
          </div>
          <button type="submit" style={{ backgroundColor: '#008080', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', width: '100%' }}>Enviar</button>
        </form>
      )}
      <div style={{ width: '50%', fontSize: '1.2rem' }}>
        <h2>Otras reseñas</h2>
        {reseñas.map(resena => (
          <div key={resena.idResena} style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px', border: '2px solid #008080', position: 'relative', borderColor: '#008080' }}>
            <h3 style={{ margin: '0' }}>{resena.titulo}</h3>
            <p style={{ margin: '20px 0', padding: '12px', background: '#f5f5f5' }}>{resena.contenido}</p>
            <p style={{ margin: '5px 0 0', fontStyle: 'italic', fontSize: '1.2rem', position: 'absolute', bottom: '5px', right: '5px', marginRight: '12px' }}
            ><img src={UserIcon} alt="User Icon" style={{ marginRight: '5px', width: '16px', height: '16px' }} />{resena.autor}</p>
          </div>
        )).reverse()} {/* Reversa el orden de las reseñas para mostrar las nuevas primero */}
      </div>
    </div>
  );
}

export default Reseña;
