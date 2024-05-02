import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom

function HomePage() {
  return (
    <div id="homepage" className="text-center">
      <img className="logo" src={process.env.PUBLIC_URL + "/logomascotmercioNegro.png"} alt="Mascotmercio Logo" style={{ width: '200px', marginBottom: '20px' }} />
      <h1 className="display-4 mb-4">Bienvenido a Mascotmercio</h1>
      <p className="lead">El lugar donde los establecimientos de ocio se conectan con los amantes de las mascotas.</p>
      <Link to="/login" className="btn btn-dark btn-lg mt-3">Accede</Link>
      <hr className="my-4" />
      <p className="text-muted">"El objetivo de este proyecto es desarrollar un servicio que permita por una parte que los establecimientos de ocio muestren su disposición a recibir clientela con animales de compañía, incluyendo la posibilidad de ofrecer productos o servicios específicos para mascotas."</p>
    </div>
  );
}

export default HomePage;
