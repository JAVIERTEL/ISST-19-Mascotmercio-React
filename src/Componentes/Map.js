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

        const geojson = {
            'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'properties': {
                                'title': '<strong>Make it Mount Pleasant</strong>',
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
                };

                // add markers to map
for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
          )
      )
    .addTo(map);
  }
    },[]);
        
        
        
           
           

      
    
    return (
        <div>
            <h1>Mapa en desarrollo por Alex</h1>
        <div id="map" style={{ position: 'fixed', top: 150, bottom: 110, width: '80%' }}></div>
        </div>
    );
}

export default MapboxMap;
