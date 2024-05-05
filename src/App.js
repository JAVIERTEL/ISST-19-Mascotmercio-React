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
import { ToastContainer } from 'react-toastify';
import CrearNegocio from './Componentes/CrearNegocio';
import Perfil from './Componentes/Perfil'; 
import { useEffect, useState } from 'react';
import AboutUs from './Componentes/AboutUs';
import Faq from './Componentes/Faq';
import ProtectedComponent from './services/ProtectedComponent';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Comprueba si hay información de usuario en el almacenamiento local al cargar la página
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="App">

      <BrowserRouter>
      <Cabecera />
      <div className='container'>
        <Routes>
        <Route exact path='/' element ={<HomePage/>}></Route>
        <Route path='/HomePage' element ={<HomePage/>}></Route>
        <Route path='/AboutUs' element ={<AboutUs/>}></Route>
        <Route path='/Faq' element ={<Faq/>}></Route>
        <Route path="/Map" element={<ProtectedComponent><Map /></ProtectedComponent>} />
        <Route path="/Places" element={<ProtectedComponent><Places /></ProtectedComponent>} />
        <Route path='/Reseña/:idTienda' element={<Reseña/>}></Route>
        <Route path='/Login' element ={<Login/>}></Route>
        <Route path='/Registro' element ={<Registro/>}></Route>
        <Route path='/AñadeNegocio/:idServicio' element={<AñadeNegocio />} />
        <Route path='/CrearNegocio' element ={<CrearNegocio/>}></Route>

        <Route path='/AñadeNegocio/Places' element={<Navigate to='/Places' />} />
        <Route path="/perfil" element={<Perfil />} />

      </Routes>
      </div>
      <ToastContainer />

      </BrowserRouter>
      
    </div>
  );
}
export default App;
