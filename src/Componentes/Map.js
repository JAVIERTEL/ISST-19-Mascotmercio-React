import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import apiServiceInstance from '../services/ApiService';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapboxMap() {
    const [tiendas, setTiendas] = useState([]);

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
                        'features': tiendasData.map(tienda => ({
                            'type': 'Feature',
                            'properties': {
                                'title': `<strong>${tienda.nombre}</strong>`,
                                'description': `<p>${tienda.description}</p>`
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-3.727238, 40.444001]
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

    return (
        <div>
            <h1>Mapa en desarrollo por Alex</h1>
            <div id="map" style={{ position: 'fixed', top: 150, bottom: 110, width: '80%' }}></div>
        </div>
    );
}

export default MapboxMap;
