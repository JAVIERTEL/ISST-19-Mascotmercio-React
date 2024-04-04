import axios from 'axios';
import {useParams} from 'react-router-dom/dist';

const USER_API_BASE_URL_TIENDAS = "http://localhost:8085/api/tienda";
const USER_API_BASE_URL_SERVICIOS = "http://localhost:8085/api/servicio";

 

const Cliente_URL = "http://localhost:8085/api/cliente";
const Propietario_URL = "http://localhost:8085/api/propietario";
const Resenas_URL = "http://localhost:8085/api/resenas";


class ApiService{

    //Cliente
    getClientes = async () => {
        try {
            const response = await axios.get(Cliente_URL + '/findAll');
            return response.data;
        } catch (error) {
            console.error('Error fetching clientes', error);
            throw error;
        }
    }

    crearCliente = async (usuario, contrasena, email) => {
        try{
            const nuevoCliente = {
                "usuario" : usuario,
                "contraseña": contrasena,
                "email" : email
            }

            const response = await axios.post(Cliente_URL, nuevoCliente);
            return response.data;
        } catch (error) {
            console.error('Error creando cliente', error);
            throw error;
        }
    }



    //Propietario

    getPropietarios = async () => {
        try {
            const response = await axios.get(Propietario_URL + '/findAll');
            return response.data;
        } catch (error) {
            console.error('Error fetching propietario', error);
            throw error;
        }
    }

    crearPropietario = async (usuario, contrasena, email) => {
        try{
            const nuevoPropietario = {
                "usuario" : usuario,
                "contraseña": contrasena,
                "email" : email
            }

            const response = await axios.post(Propietario_URL, nuevoPropietario);
            return response.data;
        } catch (error) {
            console.error('Error creando propietario', error);
            throw error;
        }
    }


    // Reseñas 

    getResenas = async () => {
        try {
            const response = await axios.get(Resenas_URL + '/findAll');
            return response.data;
        } catch (error) {
            console.error('Error fetching reseñas', error);
            throw error;
        }
    }


    // Tiendas
    getTiendas = async () => {
        try {
            const response = await axios.get(USER_API_BASE_URL_TIENDAS + '/findAll');
            return response.data;
        } catch (error) {
            console.error('Error fetching tiendas:', error);
            throw error; // Re-throw the error to handle it in the calling code
        }
    }

    deleteTienda = async (idTienda) => {
        try {
            axios.delete(USER_API_BASE_URL_TIENDAS + '/' + idTienda)
        }catch(error) {
            console.log(error)
        }
    }


    // Servicios
    getServicios = async () => {
        try {
            const response = await axios.get(USER_API_BASE_URL_SERVICIOS+ '/findAll');
            return response.data;
        } catch (error) {
            console.error('Error fetching tiendas:', error);
            throw error; // Re-throw the error to handle it in the calling code
        }
    }

    deleteServicio = async (idServicio) => {
        try {
            axios.delete(USER_API_BASE_URL_SERVICIOS + '/' + idServicio)
        }catch(error) {
            console.log(error)
        }
    }

    // Post tienda (crear tienda)
    enviarDatosTienda = async (idTienda, nombreTienda, direccion, nombrePropietario) => {
        try {
            console.log(idTienda, nombreTienda, direccion, nombrePropietario)
            const response = await axios.post(USER_API_BASE_URL_TIENDAS, {
                "idTienda": idTienda, // Se incluye el ID de la tienda en la solicitud
                "nombre": nombreTienda,
                "direccion": direccion,
                "propietario": {
                    "usuario": "juan"
                }
            }); 
            return response.data; // Retorna los datos de respuesta si es necesario
        } catch (error) {
            throw error; // Lanza el error para manejarlo en el componente
        }
    };

     // Post servicio (crear servicio)
    enviarDatosServicios = async (servicioID, admite_mascota,comida,ocio, peluqueria, accesorios, tiendaID) => {
        try {
            const response = await axios.post(USER_API_BASE_URL_SERVICIOS, {
                "idServicio": servicioID,
                "admite_mascota": admite_mascota,
                "comida": comida,
                "ocio": ocio,
                "peluqueria": peluqueria,
                "accesorios": accesorios,
                "tienda": {
                    "idTienda": tiendaID
                }
            }
            );
            return response.data; // Retorna los datos de respuesta si es necesario
        } catch (error) {
            throw error; // Lanza el error para manejarlo en el componente
        }
    };
}

const apiServiceInstance = new ApiService();
export default apiServiceInstance;
