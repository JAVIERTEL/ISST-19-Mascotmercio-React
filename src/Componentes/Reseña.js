import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 

function Reseña(props) {
  const [autor, setAutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
 
   // Utiliza useLocation para acceder a la ubicación actual
   const location = useLocation();
   // Obtiene la tienda del estado de la ubicación
   const tienda = location.state?.servicio.tienda;

  console.log(tienda);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Crea un objeto con los datos de la reseña y la tienda
    const nuevaResena = {
      autor: autor,
      titulo: titulo,
      contenido: contenido,
      tienda: tienda // Pasar la tienda como parte de la reseña
    };
    
    // Reinicia los campos del formulario después de enviar la reseña
    setAutor('');
    setTitulo('');
    setContenido('');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            id="autor"
            value={autor}
            onChange={(event) => setAutor(event.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
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
