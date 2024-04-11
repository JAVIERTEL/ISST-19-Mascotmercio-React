import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import apiServiceInstance from '../services/ApiService';
import 'mapbox-gl/dist/mapbox-gl.css';
import Axios from 'axios';

function MapboxMap() {
    const [tiendas, setTiendas] = useState([]);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [tiendasConCoordenadas, setTiendasConCoordenadas] = useState([]);
    const [servicios, setServicios] = useState([]);

    const geocodeAddress = async (direccion) => {
        const addressToGeocode = `${direccion}.json`; // Corregido: Use de comillas invertidas (`) en lugar de comillas simples (')
        const mapboxApiKey = 'pk.eyJ1IjoiYWxlamFuZHJvbWRlbGFtb3JlbmEiLCJhIjoiY2x1ZWRydmxiMTdmdDJqbnNuZ2dmOG13byJ9.hgXHzxrICsmRH4kPljAEvw';
        const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
        const endpoint = `${addressToGeocode}.json`;
        const params = {
            access_token: mapboxApiKey,
            limit: 1,
        };

        try {
            const response = await Axios.get(baseUrl + endpoint, { params });
            const features = response.data.features;

            if (features.length > 0) {
                const [longitude, latitude] = features[0].geometry.coordinates;
                return { lng: longitude, lat: latitude };
            } else {
                console.error('No se han encontrado resultados para la dirección proporcionada');
                return null;
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tiendasData = await apiServiceInstance.getTiendas();
                const serviciosData = await apiServiceInstance.getServicios();
                setServicios(serviciosData);
                setTiendas(tiendasData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (tiendas.length > 0) {
            const geocodeTiendas = async () => {
                const tiendasConCoordenadas = await Promise.all(servicios.map(async (servicio) => {
                    const coordenadas = await geocodeAddress(servicio.tienda.direccion);
                    return { ...servicio, coordenadas };
                }));

                setTiendasConCoordenadas(tiendasConCoordenadas.filter(tienda => tienda.coordenadas !== null));
                console.log('Tiendas con coordenadas', tiendasConCoordenadas);
            };

            geocodeTiendas();
        }
    }, [tiendas]);

    useEffect(() => {
        if (tiendasConCoordenadas.length > 0) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlamFuZHJvbWRlbGFtb3JlbmEiLCJhIjoiY2x1ZWRydmxiMTdmdDJqbnNuZ2dmOG13byJ9.hgXHzxrICsmRH4kPljAEvw';
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-3.727238, 40.444001],
                zoom: 9
            });

            const geojson = {
                'type': 'FeatureCollection',
                'features': tiendasConCoordenadas.map((servicio, index) => ({
                    'type': 'Feature',
                    'properties': {
            'title': `<strong>${servicio.tienda.nombre}</strong>`,
            'description': `<p>${servicio.tienda.direccion}</p>`+
                            '<p><strong>Servicios:</strong></p>' +
                            '<ul>' +
                            `${Object.entries(servicio).map(([clave, valor]) => (
                                typeof valor === 'boolean' && valor ? `<li>${clave}</li>` : ''
                            )).join('')}` +
                            '</ul>'
        },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': servicio.coordenadas // Corregido: Asigna directamente las coordenadas aquí
                    }
                }))
            };

            for (const feature of geojson.features) {
                const el = document.createElement('div');
                el.className = 'marker';

                new mapboxgl.Marker(el)
                    .setLngLat(feature.geometry.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 })
                            .setHTML(
                                `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                            )
                    )
                    .addTo(map);
            }

            return () => map.remove();
        }
    }, [tiendasConCoordenadas]);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const renderMenu = () => {
        if (menuAbierto) {
            return (
                <div className="menu">
                    <h2>Tiendas cercanas</h2>
                    <ul>
                        {servicios.map(servicio => (
                            <li key={servicio.tienda.idTienda}>
                                <strong>{servicio.tienda.nombre}</strong>
                                <p>{servicio.tienda.direccion}</p>
                                <ul className='servicios-list'>
            {Object.entries(servicio).map(([clave, valor]) => (
                (clave !== 'nombre' && clave !== 'direccion' && typeof valor === 'boolean' && valor) && 
                <li key={clave} >{clave}</li>
            ))}
        </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            <div id="map-container" className={menuAbierto ? 'menu-abierto' : ''}>
                {renderMenu()}
                <div id="map"></div>
                <button onClick={toggleMenu} className="menu-button">
                    <img src='/menu.png' alt='Menú' className="menu-icon" />
                </button>
            </div>
        </div>
    );
}

export default MapboxMap;
