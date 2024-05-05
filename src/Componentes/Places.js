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

    console.log(user);
    console.log(tiendaIdData);

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
            await apiServiceInstance.deleteServicio(id);
            await fetchData();
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
        <div className="container mt-4">
            <h2 className="text-center">Establecimientos</h2>
            {user && user.type === 'propietario' && (
                <div className="text-center my-3">
                    <Link to="/CrearNegocio">
                        <Button variant="success" style={{backgroundColor:'#4A9A7E', fontSize: '1.2rem'}}>Crear negocio</Button>
                    </Link>
                </div>
            )}
            <div className="table-responsive rounded p-3" style={{ boxShadow: '0px 0px 10px rgba(0, 128, 128, 0.5)', background: '#f8f9fa', marginTop:'25px' }}>
                <table className="table table-bordered table-striped bg-white">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Servicios</th>
                            <th>Acciones</th>
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
                                                {clave !== 'idServicio' && clave !== 'tienda' && valor && (
                                                    <li>{clave.replace('_', ' ')}</li>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    {user && user.type === 'propietario' && servicio.tienda.propietario.usuario === user.name && (
                                        <>
                                            <Button variant="primary" className="me-2" style={{backgroundColor:'#4D98A3'}} onClick={() => handleServicioById(servicio.idServicio)}>Update</Button>
                                            <Button variant="danger" onClick={() => handleDeleteServicio(servicio.idServicio)}>Delete</Button>
                                        </>
                                    )}
                                    {user && user.type === 'cliente' && (
                                        <Link to={`/reseña/${servicio.tienda.idTienda}`} className="btn btn-outline-secondary me-2">Reseñas</Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {updateId !== null && (
                <AñadeNegocio id={updateId} />
            )}
        </div>
    );
}

export default Places;
