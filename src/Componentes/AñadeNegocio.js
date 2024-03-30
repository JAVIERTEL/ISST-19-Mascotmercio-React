import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function AñadeNegocio() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [servicios, setServicios] = useState([]);

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleChangeDireccion = (event) => {
    setDireccion(event.target.value);
  };

  const handleServiciosChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setServicios([...servicios, value]);
    } else {
      setServicios(servicios.filter(servicio => servicio !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes hacer lo que quieras con los datos, por ejemplo, enviarlos a un backend.
    console.log({ nombre, direccion, servicios });
    // Luego podrías redirigir o mostrar un mensaje de éxito, etc.
  };

  return (
    <div id="añadenegocio" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Añadir Negocio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre del Establecimiento:</label>
          <input type="text" id="nombre" className="form-control" value={nombre} onChange={handleChangeNombre} required />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección:</label>
          <input type="text" id="direccion" className="form-control" value={direccion} onChange={handleChangeDireccion} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Servicios que ofrece:</label>
          <div>
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value="accesorios" onChange={handleServiciosChange} />
              Accesorios
            </label>
          </div>
          <div>
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value="comida" onChange={handleServiciosChange} />
              Comida
            </label>
          </div>
          <div>
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value="ocio" onChange={handleServiciosChange} />
              Ocio
            </label>
          </div>
          <div>
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value="peluqueria" onChange={handleServiciosChange} />
              Peluquería
            </label>
          </div>
        </div>
        <div className="d-grid">
          <Button variant="outline-success" type="submit">Añadir Negocio</Button>
        </div>
      </form>
    </div>
  );
}

export default AñadeNegocio;

