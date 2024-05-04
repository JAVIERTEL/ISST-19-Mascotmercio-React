import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import apiServiceInstance from '../services/ApiService';
import AñadeNegocio from './AñadeNegocio';
import { UserContext } from '../services/UserContext'; // Importar UserContext

function Places() {
    const { user } = useContext(UserContext); // Acceder al contexto de usuario
    const [tiendas, setTiendas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [tiendaIdData, setTiendaIdData] = useState(null);
    const [serviciosIdData, setServiciosIdData] = useState(null);
    const [updateId, setUpdateId] = useState(null); // Nuevo estado para almacenar el id al pulsar el botón "Update"
    const [resenaId, setResenaId] = useState(null); // Nuevo estado para almacenar el id al pulsar el botón "Update"


    console.log(user)
    console.log(tiendaIdData)


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

    const handleServicioById = async (id) => {
        try {
            const ServiciosIdData = await apiServiceInstance.getServicioById(id);
            const TiendaIdData = await apiServiceInstance.getTiendaById(ServiciosIdData.tienda.idTienda);
            setTiendaIdData(TiendaIdData);
            setServiciosIdData(ServiciosIdData);
            setUpdateId(id); // Almacena el id cuando se pulsa el botón "Update"
        } catch (error) {
            console.error('Error enviando tienda:', error);
        }
    };

    const handleResena = async (id) => {
        try {
            const ServiciosIdData = await apiServiceInstance.getServicioById(id);
            const TiendaIdData = await apiServiceInstance.getTiendaById(ServiciosIdData.tienda.idTienda);
            setTiendaIdData(TiendaIdData);
            setServiciosIdData(ServiciosIdData);
            setResenaId(tiendaIdData); // Almacena el id cuando se pulsa el botón "Reseña"
                } catch (error) {
            console.error('Error enviando tienda:', error);
        }
    };

    return (
        <div>
            <h2 className='text-center'>Places</h2>
            {user && user.type === 'propietario' && ( // Verifica si el usuario es propietario
                <div className="text-center" style={{ margin: '20px 0' }}>
                    <Link to="/CrearNegocio">
                        <Button variant="success" style={{ backgroundColor: '#45B69D', fontWeight: 'bold', textShadow: '1px 1px 2px #000000' }}>Crear negocio</Button>
                    </Link>
                </div>
            )}
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
                                

                           
                            {user && user.type === 'propietario' && servicio.tienda.propietario.usuario === user.name && (
                                            <>
                                            <Button variant="primary" style={{ backgroundColor: '#2E86C1', textShadow: '1px 1px 2px #000000' }} onClick={() => handleServicioById(servicio.idServicio)}>Update</Button>
                                            <Button variant="danger" style={{ backgroundColor: '#E74C3C', textShadow: '1px 1px 2px #000000' }} onClick={() => handleDeleteServicio(servicio.idServicio)}>Delete</Button>                               
                                            </>
                                    )}
                                
                                {user && user.type === 'cliente' && ( // Verifica si el usuario es cliente
                                        <Link to={`/reseña/${servicio.tienda.idTienda}`} style={{ marginLeft: '10px' }}>
                                        <Button variant="outline-secondary">Reseñas</Button>
                                        </Link>
                                )}
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
