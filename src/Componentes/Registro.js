import React, { useState } from 'react';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Link } from 'react-router-dom/dist';

function Registro() {
    return(
        <div className="register-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>Registro</h2>
     
        <div className="form-group">
          <label htmlFor="username">Direccion de correo electrónico:</label>
          <input
            type="text"
            id="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="username"
            id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="username"
            id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Repetir Contraseña:</label>
          <input
            type="username"
            id="username"
          />
        </div>
        
        
         <Button className=".grey-button">Regístrate</Button>
        
                        
    </div>
  );
}

export default Registro;