import axios from 'axios';
import {useParams} from 'react-router-dom/dist';

const USER_API_BASE_URL_TIENDAS = "http://localhost:8085/api/tienda";
const USER_API_BASE_URL_SERVICIOS = "http://localhost:8085/api/servicio";

 

const Cliente_URL = "http://localhost:8085/api/cliente";
const Propietario_URL = "http://localhost:8085/api/propietario";
const Resena_URL = "http://localhost:8085/api/resena";


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
            const response = await axios.get(Resena_URL + '/findAll');
            return response.data;
        } catch (error) {
            console.error('Error fetching reseñas', error);
            throw error;
        }
    }

    crearResena = async () => {
        try{
            const nuevaResena =   {
                "idResena": "",
                "autor": "",
                "titulo": "",
                "contenido": "",
                "tienda": {
                  "idTienda":"",
                  "nombre": "",
                  "direccion": "",
                  "propietario": {
                    "usuario": "",
                    "contraseña": "",
                    "email": ""
                  }
                },
                "cliente": {
                  "usuario": "",
                  "contraseña": "",
                  "email": ""
                },
                "propietario": {
                  "usuario": "",
                  "contraseña": "",
                  "email": ""
                }
              }

            const response = await axios.post(Resena_URL, nuevaResena);
            return response.data;
        } catch (error) {
            console.error('Error creando reseña', error);
            throw error;
        }
    }


    
    getTiendas = async () => {
        try {
            const response = await axios.get(USER_API_BASE_URL_TIENDAS + '/findAll');
            return response.data;
        } catch (error) {
            console.error('Error fetching tiendas:', error);
            throw error; // Re-throw the error to handle it in the calling code
        }
    }

    getServicios = async () => {
        try {
            const response = await axios.get(USER_API_BASE_URL_SERVICIOS+ '/findAll');
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

    deleteServicio = async (idServicio) => {
        try {
            axios.delete(USER_API_BASE_URL_SERVICIOS + '/' + idServicio)
        }catch(error) {
            console.log(error)
        }
    }
    
}

const apiServiceInstance = new ApiService();
export default apiServiceInstance;
