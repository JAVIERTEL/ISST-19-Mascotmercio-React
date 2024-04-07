import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import apiServiceInstance from '../services/ApiService';
import 'mapbox-gl/dist/mapbox-gl.css';
import Axios from 'axios';

function MapboxMap() {
    const [tiendas, setTiendas] = useState([]);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [tiendasConCoordenadas, setTiendasConCoordenadas] = useState([]);
    const coordenadas = [
        [-3.5678, 40.1234],
        [-3.9123, 40.5678],
        [-3.727238, 40.444001]
    ];

    
    const geocodeAddress = async (direccion) => {
        const addressToGeocode = '${direccion}.json'; // Replace with your address
        const mapboxApiKey = 'pk.eyJ1IjoiYWxlamFuZHJvbWRlbGFtb3JlbmEiLCJhIjoiY2x1ZWRydmxiMTdmdDJqbnNuZ2dmOG13byJ9.hgXHzxrICsmRH4kPljAEvw'; // Replace with your Mapbox API key
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
                return {latitude, longitude};
            } else {
                console.error('No se han encontrado resultados para la dirección proporcionada');
                return null;
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            return null;
        }
    };

    const geocodeTiendas = async ()=> {
        const tiendasConCoordenadas = await Promise.all(tiendas.map(async(tienda) => {
            const coordenadas = await geocodeAddress(tienda.direccion);
            return{...tienda, coordenadas}
        }));

        setTiendasConCoordenadas(tiendasConCoordenadas.filter(tienda => tienda.coordenadas !==null));
        console.log('Tiendas con coordenadas', tiendasConCoordenadas);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tiendasData = await apiServiceInstance.getTiendas();
                setTiendas(tiendasData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }; 
        fetchData();
    }, []);

   

    useEffect(()=> {
        

        

        if (tiendas.length > 0) {
            geocodeTiendas();
        }
    },[tiendas]);

    useEffect(() => {
        // Crear el mapa solo si hay datos de tiendas disponibles
        if (tiendasConCoordenadas.length > 0) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlamFuZHJvbWRlbGFtb3JlbmEiLCJhIjoiY2x1ZWRydmxiMTdmdDJqbnNuZ2dmOG13byJ9.hgXHzxrICsmRH4kPljAEvw';
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-3.727238, 40.444001],
                zoom: 13
            });

            const geojson = {
                'type': 'FeatureCollection',
                'features': tiendas.map((tienda, index) => ({
                    'type': 'Feature',
                    'properties': {
                        'title': `<strong>${tienda.nombre}</strong>`,
                        'description': `<p>${tienda.direccion}</p>`
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
    }, [tiendas]);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const renderMenu = () => {
        if (menuAbierto) {
            return (
                <div className="menu">
                    <h2>Tiendas cercanas</h2>
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
 

           
            {/* Contenedor del mapa */}
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
