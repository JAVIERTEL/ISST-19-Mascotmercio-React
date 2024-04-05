import React from 'react';
import './App.css';
import Cabecera from './Componentes/Cabecera'; // Importa el componente Cabecera
import HomePage from './Componentes/HomePage'; // Importa el componente HomePage
import Map from './Componentes/Map'; // Importa el componente Map
import Places from './Componentes/Places'; // Importa el componente Places
import Login from './Componentes/Login'; // Importa el componente Login
import Reseña from './Componentes/Reseña'; //Importa el componente Reseña
import Registro from './Componentes/Registro';
import AñadeNegocio from './Componentes/AñadeNegocio';

import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import CrearNegocio from './Componentes/CrearNegocio';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Cabecera />
      <div className='container'>
        <Routes>
        <Route exact path='/' element ={<HomePage/>}></Route>
        <Route path='/HomePage' element ={<HomePage/>}></Route>
        <Route path='/Map' element ={<Map/>}></Route>
        <Route path='/Places' element ={<Places/>}></Route>
        <Route path='/Reseña' element={<Reseña/>}></Route>
        <Route path='/Login' element ={<Login/>}></Route>
        <Route path='/Registro' element ={<Registro/>}></Route>
        <Route path='/AñadeNegocio/:idServicio' element={<AñadeNegocio />} />
        <Route path='/CrearNegocio' element ={<CrearNegocio/>}></Route>

        <Route path='/AñadeNegocio/Places' element={<Navigate to='/Places' />} />

      </Routes>
      </div>
      </BrowserRouter>
      
    </div>
  );
}
export default App;
