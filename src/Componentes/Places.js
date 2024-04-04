import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import apiServiceInstance from '../services/ApiService';

function Places() {
    const [tiendas, setTiendas] = useState([]);
    const [servicios, setServicios] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const tiendasData = await apiServiceInstance.getTiendas();
            const serviciosData = await apiServiceInstance.getServicios();
            setTiendas(tiendasData);
            setServicios(serviciosData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDeleteServicio = async (id) => {
        try {
            const servicio = servicios.find(servicio => servicio.idServicio === id);
            if (!servicio) {
                console.error('Servicio no encontrado');
                return;
            }
            // Realiza la solicitud DELETE utilizando la función de tu servicio API
            await apiServiceInstance.deleteServicio(id);
            await apiServiceInstance.deleteTienda(servicio.tienda.idTienda);

            // Actualiza la lista de tiendas después de eliminar una
            await fetchData();
        } catch (error) {
            console.error('Error deleting tienda:', error);
        }
    };

    return (
        <div>
            <h2 className='text-center'>Places</h2>
            <div className="text-center" style={{ margin: '20px 0' }}>
                <Link to="/CrearNegocio">
                    <Button variant="success" style={{ backgroundColor: '#45B69D ', fontWeight: 'bold', textShadow: '1px 1px 2px #000000' }}>Añadir Negocio</Button>
                </Link>
            </div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Place Name</th>
                        <th>Dirección</th>
                        <th>Servicios</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios.map(servicio => (
                        <tr key={servicio.idServicio}>
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
                                <>
                                    <Link to="/AñadeNegocio" style={{ marginRight: '10px' }}>
                                        <Button variant="primary" style={{ backgroundColor: '#2E86C1', textShadow: '1px 1px 2px #000000' }}>Update</Button>
                                    </Link>
                                    <Button variant="danger" style={{ backgroundColor: '#E74C3C', textShadow: '1px 1px 2px #000000' }} onClick={() => handleDeleteServicio(servicio.idServicio)}>Delete</Button>
                                </>

                                <Link to="/reseña" style={{ marginLeft: '10px' }}>
                                    <Button variant="outline-secondary">Reseñas</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <span>
                Lo que habrá que hacer aquí es crear un fichero en servicios que haga
                una petición a la API y que saque todos los locales y a continuación implementar
                esa vista aquí junto con los botones Update y Delete
            </span>
        </div>
        
    );
}

export default Places;
