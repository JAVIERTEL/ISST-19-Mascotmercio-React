import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import apiServiceInstance from '../services/ApiService';
import 'mapbox-gl/dist/mapbox-gl.css';
import Axios from 'axios';
import './../map.css'

function MapboxMap() {
    const [tiendas, setTiendas] = useState([]);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [tiendasConCoordenadas, setTiendasConCoordenadas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
    const [map,setMap] = useState(null)
    const [busqueda,setBusqueda]= useState('');


    const geocodeAddress = async (direccion) => {
        const addressToGeocode = `${direccion}.json`; // Replace with your address
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

    const obtenerNombresBooleanos = () => {
        const nombres = [];
        for (const servicio of servicios) {
            for (const clave in servicio) {
                if (typeof servicio[clave] === 'boolean' && !nombres.includes(clave)) {
                    
                    nombres.push(clave);
                }
            }
        }
        return nombres;
    };

    const handleCheckboxChange = (event) => {
        const servicioSeleccionado = event.target.value;
        if (event.target.checked) {
            // Si la casilla está marcada, agregamos el servicio seleccionado al array
            setServiciosSeleccionados([...serviciosSeleccionados, servicioSeleccionado]);
            console.log(serviciosSeleccionados)

        } else {
            // Si la casilla está desmarcada, eliminamos el servicio seleccionado del array
            setServiciosSeleccionados(serviciosSeleccionados.filter(servicio => servicio !== servicioSeleccionado));
            console.log(serviciosSeleccionados)
        }
    };


    const handleMenuItemClick = (coordenadas) => {
        if (coordenadas) {
            map.flyTo({ center: coordenadas, zoom: 15 }); // Cambia el zoom y centra el mapa en las coordenadas especificadas
        }
    };

    // Func


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

    useEffect(()=> {
        if (tiendas.length > 0) {
            geocodeTiendas();
        }
    }, [tiendas,servicios]);

    useEffect(() => {
        if (tiendasConCoordenadas.length > 0) {

            mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlamFuZHJvbWRlbGFtb3JlbmEiLCJhIjoiY2x1ZWRydmxiMTdmdDJqbnNuZ2dmOG13byJ9.hgXHzxrICsmRH4kPljAEvw';
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-3.727238, 40.444001],
                zoom: 10
            });
            setMap(map);
            const tiendasFiltradas = tiendasConCoordenadas.filter(tienda => {
                return serviciosSeleccionados.every(servicio => tienda[servicio]);
            });

            
            

            const geojson = {
                'type': 'FeatureCollection',
                'features': tiendasConCoordenadas.map((tienda, index) => ({
                    'type': 'Feature',
                    'properties': {
            'title': `<strong>${servicio.tienda.nombre}</strong>`,
            'description': `<p>${servicio.tienda.direccion}</p>`+
                            '<p><strong>Servicios:</strong></p>' +
                            '<ul>' +
                            `${Object.entries(servicio).map(([clave, valor]) => (
                                typeof valor === 'boolean' && valor ? `
                                <li key={clave}>
                                ${clave === 'admite_mascota' ? '<img src="/pata.png" alt="servicio_1" class="icono-servicio" />' : ''}
                                ${clave === 'comida' ? '<img src="/comida-de-perro.png" alt="servicio_2" class="icono-servicio" />' : ''}
                                ${clave === 'ocio' ? '<img src="/canino.png" alt="servicio_3" class="icono-servicio" />' : ''}
                                ${clave === 'peluqueria' ? '<img src="/aseo.png" alt="servicio_4" class="icono-servicio" />' : ''}
                                ${clave === 'accesorios' ? '<img src="/collar-para-mascotas.png" alt="servicio_5" class="icono-servicio" />' : ''}
                                ${clave.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</li>` : ''
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
    }, [tiendasConCoordenadas,serviciosSeleccionados]);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };


    const nombresBooleanos = obtenerNombresBooleanos();

            let tiendasFiltradas = tiendasConCoordenadas;

            if (serviciosSeleccionados.length>0) {
                tiendasFiltradas = tiendasConCoordenadas.filter(tienda => {
                    return serviciosSeleccionados.every(servicio => tienda[servicio]);
                });
            }

    const renderMenu = () => {
        if (menuAbierto) {
            



            
        

            return (
                <div className="menu">

              
  


                    <h2 >Tiendas cercanas</h2>


                    <ul>
                        {tiendasFiltradas.map(servicio => (

                            

                            
                            <li key={servicio.tienda.idTienda} onClick={() => handleMenuItemClick(servicio.coordenadas)}>
                                
                                <strong>{servicio.tienda.nombre}</strong>
                                <p>{servicio.tienda.direccion}</p>
                                <ul className='servicios-list'>
                                {Object.entries(servicio).map(([clave, valor]) => (
               
                                (clave !== 'nombre' && clave !== 'direccion' && typeof valor === 'boolean' && valor) && 
                                <li key={clave}>
                                {clave === 'admite_mascota' && <img src='/pata.png' alt='servicio_1' className='icono-servicio' />}
                                {clave === 'comida' && <img src='/comida-de-perro.png' alt='servicio_2' className='icono-servicio' />}
                                {clave === 'ocio' && <img src='/canino.png' alt='servicio_3' className='icono-servicio' />}
                                {clave === 'peluqueria' && <img src='/aseo.png' alt='servicio_3' className='icono-servicio' />}
                                {clave === 'accesorios' && <img src='/collar-para-mascotas.png' alt='servicio_3' className='icono-servicio' />}

                                 {clave.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} {/* Capitaliza la primera letra de cada palabra */}
                                 </li>
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


     const handleSearch = async () => {
        if (busqueda.trim() !== '') {
            const tiendaBuscada = tiendasConCoordenadas.find(tienda => tienda.tienda.nombre.toLowerCase() === busqueda.toLowerCase());
            if (tiendaBuscada) {
                handleMenuItemClick(tiendaBuscada.coordenadas);
            } else {
                alert('No se encontró ninguna tienda con ese nombre.');
            }
        } else {
            alert('Ingrese un nombre de tienda para buscar.');
        }
    };

    



    return (
        <div>
            <div id="map-container" className={menuAbierto ? 'menu-abierto' : ''}>
            <div className='filtro'>
                <div className='busqueda-container'>
                <input
                type='text'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder='Buscar tienda por nombre'
                />
               <button onClick={handleSearch}>
                <img src="busqueda.png" alt="Buscar" style={{ width: '20px', marginRight: '5px' }} />
            </button>
                </div>
                
                <ul>
                    {nombresBooleanos.map( nombre => (
                        <li key={nombre} className='option-container'>
                            <input
                            type='checkbox'
                            id={nombre}
                            value={nombre}
                            checked={serviciosSeleccionados.includes(nombre)}
                            onChange={handleCheckboxChange}
                            className='checkbox-input'
                            />
                            <span className='slider'></span>
                            <label htmlFor={nombre}>
                                {nombre === 'admite_mascota' && <img src='/pata.png' alt='servicio_1' className='icono-servicio' /> }
                                {nombre === 'comida' && <img src='/comida-de-perro.png' alt='servicio_2' className='icono-servicio' />}
                                {nombre === 'ocio' && <img src='/canino.png' alt='servicio_3' className='icono-servicio' />}
                                {nombre === 'peluqueria' && <img src='/aseo.png' alt='servicio_3' className='icono-servicio' />}
                                {nombre === 'accesorios' && <img src='/collar-para-mascotas.png' alt='servicio_3' className='icono-servicio' />}
                                {nombre.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                            
                            </label>

                        </li>
                    ))}

                </ul>

                
               
                 
             
            </div>
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
