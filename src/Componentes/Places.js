import React, { useEffect, useState} from 'react';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Link } from 'react-router-dom/dist';
function Places() {

    const [tienda,setTienda] = useState ([]);

    useEffect(() => {
        //Aqui metemos la peticion de la API que dice Javi. Pero hasta entonces metemos una tienda de prueba para poner bien los botones.
    setTienda([
        {id_tienda:1, nombre:"Tienda prueba", dirección: "Calle inventada", servicios: "Peluqueria"},
    ]);
    }, []);

    return (
<div>
<h2 className='text-center'>Places</h2>
<table className='table table-bordered table-striped'>
        <thead>
            <th>Place Name</th>
            <th>Dirección</th>
            <th>Servicios</th>
            <th>Actions</th>
        </thead>
        <tbody>
            {
                tienda.map (
                    tienda =>
                    <tr key= {tienda.id_tienda}>
                        <td>{tienda.nombre}</td>
                        <td>{tienda.dirección}</td>
                        <td>{tienda.servicios}</td>
                        <td>
                        <Button className="primary">Update</Button>
                        <Button variant="danger">Delete</Button>
                        <p>
                        <Link to="/reseña">
                        <Button className=".grey-button">Añade tu reseña</Button>
                        </Link>
                        
                        </p>
                        </td>
                    </tr>
                )
            }
        </tbody>

</table>


<span>Lo que habrá que hacer aquí es crear un fichero en servicios que haga
una petición a la api y que saque todos los locales y a continuación implemetar
esa vista aquí junto con los botones Update y Delete

idea de como hacerlo:
https://www.youtube.com/watch?v=3Cy3KCirn5U&t=15711s&ab_channel=LaTecnolog%C3%ADaAvanza

Por el 3 horas 45 minutos
</span>



</div>

    );
}export default Places;

