import React, { useEffect, useState} from 'react';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Link } from 'react-router-dom/dist';
function Places() {

    const [tiendas,setTiendas] = useState ([]);
    const [propietario, setPropietario] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8085/api/tienda/findAll')
            .then(response => response.json())
            .then(data => setTiendas(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
<div>
<h2 className='text-center'>Places</h2>
<table className='table table-bordered table-striped'>
        <thead>
            <th>Place Name</th>
            <th>Dirección</th>
            <th>Actions</th>
        </thead>
        <tbody>
            {
                tiendas.map (
                    tienda =>
                    <tr key= {tienda.idTienda}>
                        <td>{tienda.nombre}</td>
                        <td>{tienda.direccion}</td>
                        <td>
                        {
                        <>
                        <Button className="primary">Update</Button>
                        <Button variant="danger">Delete</Button>
                        </>
                        }

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

