import React from 'react';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.rtl.min.css'
function HomePage() {
  return (
    <div id="homepage">
      <img className="logo" src={process.env.PUBLIC_URL + "/logomascotmercio.png"} alt="logo" />
      <br/>
      <Button variant="dark" className="w-25 mb-4">Accede</Button>
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
