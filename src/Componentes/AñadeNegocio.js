import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiServiceInstance from '../services/ApiService';

function AñadeNegocio() {
    const [nombreTienda, setNombreTienda] = useState('');
    const [direccion, setDireccion] = useState('');
    const [nombrePropietario, setNombrePropietario] = useState('');
    const [admite_mascota, setAdmite_mascota] = useState(false);
    const [comida, setComida] = useState(false);
    const [ocio, setOcio] = useState(false);
    const [peluqueria, setPeluqueria] = useState(false);
    const [accesorios, setAccesorios] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Obtener datos del negocio con el ID proporcionado
            const negocioData = await apiServiceInstance.getNegocio(id);
            // Llenar el estado con los datos del negocio
            setNombreTienda(negocioData.nombreTienda);
            setDireccion(negocioData.direccion);
            setNombrePropietario(negocioData.nombrePropietario);
            setAdmite_mascota(negocioData.admite_mascota);
            setComida(negocioData.comida);
            setOcio(negocioData.ocio);
            setPeluqueria(negocioData.peluqueria);
            setAccesorios(negocioData.accesorios);
        } catch (error) {
            console.error('Error fetching data:', error);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Realizar la actualización del negocio utilizando el ID proporcionado
            await apiServiceInstance.updateNegocio(id, nombreTienda, direccion, nombrePropietario, admite_mascota, comida, ocio, peluqueria, accesorios);
            console.log('Negocio actualizado exitosamente');
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                <div style={{ marginBottom: '15px' }}>
                    <label>Nombre del Propietario:</label>
                    <input type="text" value={nombrePropietario} onChange={(e) => setNombrePropietario(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginTop: '15px' }}>
                    <Button style={{ backgroundColor: '#45B69D ', fontWeight: 'bold', textShadow: '1px 1px 2px #000000', padding: '3px 35px', fontSize: '20px' }} onClick={handleSubmit}>Actualizar</Button>
                    <Link to="/places">
                        <Button variant="danger" style={{ marginLeft: '20px', fontWeight: 'bold', textShadow: '1px 1px 2px #000000', padding: '3px 35px', fontSize: '20px' }}>Cancelar</Button>
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

export default AñadeNegocio;

