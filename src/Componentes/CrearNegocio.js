import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; // Importar Link
import apiServiceInstance from '../services/ApiService';
import { useContext } from 'react';
import { UserContext } from '../services/UserContext';


function CrearNegocio() {
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

    

    if (!user) {
        return <p>Por favor, <Link to="/Login">inicia sesión</Link> para ver esta página.</p>;
      }
    

    // Función para generar un UUID numérico único
    const generarUUID = () => {
        return Math.floor(Math.random() * Date.now()).toString();
    };

    const handleCreate = async () => {
        try {
            // Realizar una solicitud POST a /api/tienda usando la función de api.js
            const tiendaID = generarUUID(); // Genera un UUID único para el ID de la tienda
            console.log(nombrePropietario);
            const tiendaResponse = await apiServiceInstance.enviarDatosTienda(tiendaID, nombreTienda, direccion, nombrePropietario);
            
            const servicioID = generarUUID();
            // Realizar una solicitud POST a /api/servicio usando la función de api.js
            await apiServiceInstance.enviarDatosServicios(servicioID, admite_mascota, comida, ocio, peluqueria, accesorios, tiendaID);

            console.log('Negocio creado exitosamente');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        // Setea el valor correspondiente a true
        switch(name) {
            case "admite_mascota":
                setAdmite_mascota(checked);
                break;
            case "comida":
                setComida(checked);
                break;
            case "ocio":
                setOcio(checked);
                break;
            case "peluqueria":
                setPeluqueria(checked);
                break;
            case "accesorios":
                setAccesorios(checked);
                break;
            default:
                break;
        }
    }

    return (
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            
            <div style={{ width: '50%', marginRight: 40, marginTop: 40 }}>
                <h2>Rellena el formulario con los datos de tu negocio</h2>
                <div>
                    <label>Nombre de la Tienda:</label>
                    <input type="text" value={nombreTienda} onChange={(e) => setNombreTienda(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }} required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Dirección:</label>
                    <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }} required />
                </div>
                <div style={{ marginTop: '15px' }}>
                    {/* Utiliza un enlace Link con evento onClick */}
                    <Link to="/places" onClick={handleCreate}>
                        <Button style={{ backgroundColor: '#45B69D ', fontWeight: 'bold', textShadow: '1px 1px 2px #000000', padding: '3px 35px', fontSize: '20px' }}>Crear</Button>
                    </Link>
                </div>
            </div>
            <div style={{ width: '50%', paddingLeft: '20px', marginTop: 40 }}>
                <h2>Servicios que ofreces</h2>
                <div style={{ marginTop: '15px' }}>
                    <label style={{ marginBottom: '10px' }}>
                        <input type="checkbox" name="admite_mascota" checked={admite_mascota} onChange={handleCheckboxChange} style={{ transform: 'scale(1.2)', marginRight: 10 }} />
                        Admite Mascota
                    </label>
                </div>
                <div>
                    <label style={{ marginBottom: '10px' }}>
                        <input type="checkbox" name="comida" checked={comida} onChange={handleCheckboxChange} style={{ transform: 'scale(1.2)', marginRight: 10 }} />
                        Comida
                    </label>
                </div>
                <div>
                    <label style={{ marginBottom: '10px' }}>
                        <input type="checkbox" name="ocio" checked={ocio} onChange={handleCheckboxChange} style={{ transform: 'scale(1.2)', marginRight: 10 }} />
                        Ocio
                    </label>
                </div>
                <div>
                    <label style={{ marginBottom: '10px' }}>
                        <input type="checkbox" name="peluqueria" checked={peluqueria} onChange={handleCheckboxChange} style={{ transform: 'scale(1.2)', marginRight: 10 }} />
                        Peluquería
                    </label>
                </div>
                <div>
                    <label style={{ marginBottom: '10px' }}>
                        <input type="checkbox" name="accesorios" checked={accesorios} onChange={handleCheckboxChange} style={{ transform: 'scale(1.2)', marginRight: 10 }} />
                        Accesorios
                    </label>
                </div>
            </div>
        </div>
    );
}

export default CrearNegocio;
