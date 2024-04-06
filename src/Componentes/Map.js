import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import apiServiceInstance from '../services/ApiService';
import 'mapbox-gl/dist/mapbox-gl.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-ry0CFbq3zHd0UpW7LHFJjSmX3Bu2W1K27clLxiZnS8Tj/FrEW24GAlU4Qkqky4VOMZsPz6Rg3ISdDyiXNvwPUg==" crossorigin="anonymous" referrerpolicy="no-referrer" />


function MapboxMap() {
    const [tiendas, setTiendas] = useState([]);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const coordenadas = [
        [-3.5678, 40.1234],
        [-3.9123, 40.5678],
        [-3.727238, 40.444001]
    ];
    
      

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tiendasData = await apiServiceInstance.getTiendas();
                setTiendas(tiendasData);

                // Crear el mapa solo si hay datos de tiendas disponibles
                if (tiendasData.length > 0) {
                    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlamFuZHJvbWRlbGFtb3JlbmEiLCJhIjoiY2x1ZWRydmxiMTdmdDJqbnNuZ2dmOG13byJ9.hgXHzxrICsmRH4kPljAEvw';
                    const map = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/mapbox/streets-v12',
                        center: [-3.727238, 40.444001],
                        zoom: 13
                    });

                    const geojson = {
                        'type': 'FeatureCollection',
                        'features': tiendasData.map((tienda, index) => ({
                            'type': 'Feature',
                            'properties': {
                                'title': `<strong>${tienda.nombre}</strong>`,
                                'description': `<p>${tienda.description}</p>`
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': coordenadas[index]
                            }
                        }))
                    };

                    // Agregar marcadores al mapa
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

                    // Limpia el mapa cuando el componente se desmonta
                    return () => map.remove();
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const renderMenu = () => {
        if (menuAbierto) {
            return (
                <div className="menu">
                    <h2>Listado de Tiendas</h2>
                    <ul>
                        {tiendas.map(tienda => (
                            <li key={tienda.id}>
                                <strong>{tienda.nombre}</strong>
                                <p>{tienda.direccion}</p>
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
            {/* Botón para abrir/cerrar el menú */}
            <button onClick={toggleMenu} className="toggle-menu">
                <i className="fas fa-bars" style={{ color: '#3b5998' }}></i> {/* Icono de hamburguesa */}
            </button>

            {/* Renderizado condicional del menú */}
            {renderMenu()}

            {/* Contenedor del mapa */}
            <div id="map-container" className={menuAbierto ? 'menu-abierto' : ''}>
                <div id="map"></div>
            </div>
        </div>
    );
}

export default MapboxMap;
