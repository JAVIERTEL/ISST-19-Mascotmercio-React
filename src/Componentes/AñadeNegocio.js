import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiServiceInstance from '../services/ApiService';
import { useContext } from 'react';
import { UserContext } from '../services/UserContext';

function AñadeNegocio({ id }) {

    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');

    const [nombreTienda, setNombreTienda] = useState('');
    const [direccion, setDireccion] = useState('');
    const [nombrePropietario, setNombrePropietario] = useState(username);

    const [admite_mascota, setAdmite_mascota] = useState(false);
    const [comida, setComida] = useState(false);
    const [ocio, setOcio] = useState(false);
    const [peluqueria, setPeluqueria] = useState(false);
    const [accesorios, setAccesorios] = useState(false);
    const [idTienda, setIdTienda] = useState(null); // Estado para almacenar el ID de la tienda
    const [idServicio,setIdServicio] =useState(null);
    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (id) => {
        try {
            const servicio = await apiServiceInstance.getServicioById(id);
            const tienda = await apiServiceInstance.getTiendaById(servicio.tienda.idTienda);

            // Establecer los valores de los campos del formulario con los datos obtenidos
            setNombreTienda(tienda.nombre);
            setDireccion(tienda.direccion);
            setNombrePropietario(tienda.propietario.usuario);
            setAdmite_mascota(servicio.admite_mascota);
            setComida(servicio.comida);
            setOcio(servicio.ocio);
            setPeluqueria(servicio.peluqueria);
            setAccesorios(servicio.accesorios);
            setIdTienda(tienda.idTienda); // Almacena el ID de la tienda en el estado
            setIdServicio(servicio.idServicio);
            console.log(tienda);
            console.log(servicio);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto de tienda y servicio con los datos actualizados
    const tiendaActualizada = {
        idTienda :idTienda,
        nombre: nombreTienda,
        direccion: direccion,
        propietario: {
            usuario: nombrePropietario
        }
    };

    const servicioActualizado = {
        idServicio: idServicio,
        admite_mascota: admite_mascota,
        comida: comida,
        ocio: ocio,
        peluqueria: peluqueria,
        accesorios: accesorios,
        tienda: {
            idTienda: idTienda
        }
    };

    try {
        // Envía los datos actualizados del formulario al servidor para guardarlos

        await apiServiceInstance.actualizarTienda(idTienda, tiendaActualizada);
        await apiServiceInstance.actualizarServicio(id, servicioActualizado);
        console.log('Datos guardados exitosamente');
        window.location.reload();

    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
};

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <form onSubmit={handleSubmit} style={{ width: '50%', marginRight: 40 }}>
                <h2 className='text-center'>Edita tu negocio</h2>
                <div className="form-group">
                    <label htmlFor="nombreTienda">Nombre de la Tienda:</label>
                    <input type="text" className="form-control" id="nombreTienda" value={nombreTienda} onChange={(e) => setNombreTienda(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }} required />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección:</label>
                    <input type="text" className="form-control" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }} required/>
                </div>
                <div style={{ marginTop: '15px' }}>
                    <Button style={{ backgroundColor: '#45B69D ', fontWeight: 'bold', textShadow: '1px 1px 2px #000000', padding: '3px 35px', fontSize: '20px', marginBottom: 20 }} onClick={handleSubmit}>Guardar</Button>
                </div>
            </form>
            <div style={{ width: '50%', paddingLeft: '20px', marginTop: 40 }}>
                <h2>Servicios que ofreces</h2>
                <div style={{ marginTop: '15px' }}>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="admiteMascota" checked={admite_mascota} onChange={(e) => setAdmite_mascota(e.target.checked)} />
                        <label className="form-check-label" htmlFor="admiteMascota">Admite Mascotas</label>
                    </div>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="comida" checked={comida} onChange={(e) => setComida(e.target.checked)} />
                    <label className="form-check-label" htmlFor="comida">Servicio de Comida</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="ocio" checked={ocio} onChange={(e) => setOcio(e.target.checked)} />
                    <label className="form-check-label" htmlFor="ocio">Servicio de Ocio</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="peluqueria" checked={peluqueria} onChange={(e) => setPeluqueria(e.target.checked)} />
                    <label className="form-check-label" htmlFor="peluqueria">Servicio de Peluquería</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="accesorios" checked={accesorios} onChange={(e) => setAccesorios(e.target.checked)} />
                    <label className="form-check-label" htmlFor="accesorios">Venta de Accesorios</label>
                </div>
            </div>
        </div>
    );
    
}

export default AñadeNegocio;
