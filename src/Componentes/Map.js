import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

function MapboxMap() {
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlamFuZHJvbWRlbGFtb3JlbmEiLCJhIjoiY2x1ZWRydmxiMTdmdDJqbnNuZ2dmOG13byJ9.hgXHzxrICsmRH4kPljAEvw';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-3.727238, 40.444001 ],
            zoom: 13
        });

        map.on('load', () => {
            map.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<strong>Make it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-3.727238, 40.444001 ]
                            }
                        },
                        // Otras características...
                    ]
                }
            });
            // Añadir una capa que muestre los lugares.
            map.addLayer({
                'id': 'places',
                'type': 'circle',
                'source': 'places',
                'paint': {
                    'circle-color': '#4264fb',
                    'circle-radius': 6,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });

            // Crear un popup, pero no lo añadas al mapa todavía.
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: true
            });

            map.on('mouseenter', 'places', (e) => {
                // Cambiar el estilo del cursor como indicador de interfaz de usuario.
                map.getCanvas().style.cursor = 'pointer';

                // Copiar array de coordenadas.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                // Asegurarse de que si el mapa está alejado de tal manera que múltiples
                // copias de la característica son visibles, el popup aparece
                // sobre la copia a la que se apunta.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Poblar el popup y establecer sus coordenadas
                // basadas en la característica encontrada.
                popup.setLngLat(coordinates).setHTML(description).addTo(map);
            });

            map.on('mouseleave', 'places', () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });
        });

        // Limpiar el mapa cuando el componente se desmonte
        return () => map.remove();
    }, []);

    return (
        <div>
            <h1>Mapa en desarrollo por Alex</h1>
        <div id="map" style={{ position: 'fixed', top: 150, bottom: 110, width: '80%' }}></div>
        </div>
    );
}

export default MapboxMap;
