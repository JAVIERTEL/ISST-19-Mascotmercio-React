import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom

function Faq() {
  return (
    <div id="faq">
      <br />
      <p className="centered-text mt-3 fw-bold">
        <span className="bold-font">
          <h1> Preguntas Frecuentes </h1>
        </span>
      </p>
      <div className="container">
        <div className="p-4 mb-4 bg-light rounded">
          <h2>¿Cómo puedo registrarme en Mascotmercio?</h2>
          <p>
            Para registrarte en Mascotmercio, simplemente haz clic en el botón "Registrarse" en la esquina superior derecha de la página y sigue las instrucciones.
          </p>
        </div>
        <div className="p-4 mb-4 bg-light rounded">
          <h2>¿Cuál es el tiempo de entrega de los pedidos?</h2>
          <p>
            El tiempo de entrega varía según la ubicación y el método de envío seleccionado. Por lo general, los pedidos se entregan dentro de los 3-5 días hábiles.
          </p>
        </div>
        <div className="p-4 mb-4 bg-light rounded">
          <h2>¿Cómo puedo realizar un seguimiento de mi pedido?</h2>
          <p>
            Puedes realizar un seguimiento de tu pedido iniciando sesión en tu cuenta y navegando a la sección "Mis Pedidos". Allí encontrarás un enlace de seguimiento para cada pedido realizado.
          </p>
        </div>
        {/* Agrega más preguntas frecuentes y sus respuestas aquí */}
      </div>
    </div>
  );
}

export default Faq;
