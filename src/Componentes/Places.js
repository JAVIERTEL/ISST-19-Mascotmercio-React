import React, { useEffect, useState} from 'react';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Link, useParams } from 'react-router-dom/dist';
import apiServiceInstance from '../services/ApiService';

function Places() {

    const [tiendas, setTiendas] = useState([]);
    const [servicios, setServicios] = useState([]);

    const {id} = useParams();
    
    useEffect(() => {
    fetchData();
    }, []);

    const fetchData = async () => {
        try{
        const tiendasData = await apiServiceInstance.getTiendas();
        const serviciosData = await apiServiceInstance.getServicios();
        setTiendas(tiendasData);
        setServicios(serviciosData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleDeleteServicio = async (id) => {
        try {
            // Realiza la solicitud DELETE utilizando la función de tu servicio API
            await apiServiceInstance.deleteServicio(id);
            
            // Actualiza la lista de tiendas después de eliminar una
            await fetchData();
        } catch (error) {
            console.error('Error deleting tienda:', error);
        }
    };


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
                        <Button variant="danger" onClick={() => handleDeleteServicio(servicio.idServicio)}>Delete</Button>
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

