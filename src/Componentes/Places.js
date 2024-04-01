import React, { useEffect, useState} from 'react';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Link } from 'react-router-dom/dist';
function Places() {

    const [propietario, setPropietario] = useState(false);
    const [servicios, setServicios] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8085/api/servicio/findAll')
            .then(response => response.json())
            .then(data => {
                setServicios(data);
            })
            .catch(error => console.error('Error fetching data:', error));
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
                servicios.map (
                    servicio =>
                    <tr key= {servicio.idServicio}>
                        <td>{servicio.tienda.nombre}</td>
                        <td>{servicio.tienda.direccion}</td>
                        <td>
                                <ul>
                                    {Object.entries(servicio || {}).map(([clave, valor]) => (
                                        typeof valor === 'boolean' && valor && <li key={clave}>{clave}</li>
                                    ))}
                                </ul>
                            </td>
                        <td>
                        {
                        <>
                         <Link to="/AñadeNegocio">
                        <Button variant="primary">Update</Button>
                        </Link>
                        <Button variant="danger" style={{ marginRight: "10px" }}>Delete</Button>
                        </>
                        }

                 
                        <Link to="/reseña">
                        <Button variant="outline-secondary">Reseñas</Button>
                        </Link>
                        
                        
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

