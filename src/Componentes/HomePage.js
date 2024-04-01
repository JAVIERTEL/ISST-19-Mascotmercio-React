import React from 'react';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom

function HomePage() {
  return (
    <div id="homepage">
      <img className="logo" src={process.env.PUBLIC_URL + "/logomascotmercioNegro.png"} alt="logo" />
      <br/>
      <Link to="/login">
      <Button variant="dark" >Accede</Button>
      </Link>
      <p className="centered-text mt-3 fw-bold">
        <span className="bold-font">
          "El objetivo de este proyecto es desarrollar un servicio que permita por<br></br>
          una parte que los establecimientos de ocio muestren su disposición a <br></br>
          recibir clientela con animales de compañía, incluyendo la posibilidad de <br></br>
          ofrecer productos o servicios específicos para mascotas"
        </span>
      </p>
    </div>
  );
}
export default HomePage;
