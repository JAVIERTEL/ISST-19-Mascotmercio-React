import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import apiServiceInstance from '../services/ApiService';
import AñadeNegocio  from './AñadeNegocio';

function Places() {
    const [tiendas, setTiendas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [tiendaIdData, setTiendaIdData] = useState(null);
    const [serviciosIdData, setServiciosIdData] = useState(null);
    const [updateId, setUpdateId] = useState(null); // Nuevo estado para almacenar el id al pulsar el botón "Update"



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const tiendasData = await apiServiceInstance.getTiendas();
            const serviciosData = await apiServiceInstance.getServicios();
            setTiendas(tiendasData);
            setServicios(serviciosData);
            console.log(tiendasData); //Traza que muestra todas las tiendas que llegan a places
            console.log(serviciosData); //Traza que muestra todas los servicios que llegan a places
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

            // Actualiza la lista de tiendas después de eliminar una
            await fetchData();

            // Recarga la página para mostrar los cambios
            window.location.reload();
        } catch (error) {
            console.error('Error deleting tienda:', error);
        }
    };
    //Este método obtiene los datos asociados a una tienda y sus servicios
    const handleServicioById = async (id) => {
        try {
            const servicio = servicios.find(servicio => servicio.idServicio === id);
            if (!servicio) {
                console.error('Servicio no encontrado');
                return;
            }
            const ServiciosIdData = await apiServiceInstance.getServicioById(id);
            const TiendaIdData = await apiServiceInstance.getTiendaById(servicio.tienda.idTienda);
            setTiendaIdData(TiendaIdData);
            setServiciosIdData(ServiciosIdData);
            setUpdateId(id); // Almacena el id cuando se pulsa el botón "Update"
            console.log(TiendaIdData) 
            console.log(ServiciosIdData)
        } catch (error) {
            console.error('Error enviando tienda:', error);
        }
    };

    return (
        <div>
            <h2 className='text-center'>Places</h2>
            <div className="text-center" style={{ margin: '20px 0' }}>
                <Link to="/CrearNegocio">
                    <Button variant="success" style={{ backgroundColor: '#45B69D ', fontWeight: 'bold', textShadow: '1px 1px 2px #000000' }}>Crear negocio</Button>
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
                                            <React.Fragment key={clave}>
                                                {/* Modifica el texto para cada opción */}
                                                {clave === 'admite_mascota' && valor && <li>Admite Mascota</li>}
                                                {clave === 'comida' && valor && <li>Servicio de Comida</li>}
                                                {clave === 'ocio' && valor && <li>Servicio de Ocio</li>}
                                                {clave === 'peluqueria' && valor && <li>Servicio de Peluquería</li>}
                                                {clave === 'accesorios' && valor && <li>Venta de Accesorios</li>}
                                            </React.Fragment>
                                        ))}
                                    </ul>
                            </td>

                            <td>
                                <>
                                    {/* Aquí se establece el estado updateId cuando se pulsa el botón "Update" */}
                                    <Button variant="primary" style={{ backgroundColor: '#2E86C1', textShadow: '1px 1px 2px #000000' }}onClick={() => handleServicioById(servicio.idServicio)}>Update</Button>
                                    <Button variant="danger" style={{ backgroundColor: '#E74C3C', textShadow: '1px 1px 2px #000000' }} onClick={() => handleDeleteServicio(servicio.idServicio)}>Delete</Button>
                                    <Link to="/reseña" style={{ marginLeft: '10px' }}>
                                        <Button variant="outline-secondary">Reseñas</Button>
                                    </Link>
                                </>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          
            
            {/* Renderiza el componente AñadeNegocio solo cuando updateId no es null */}
            {updateId !== null && (
                <AñadeNegocio id={updateId} />
            )}
        </div>
    );
}

export default Places;
