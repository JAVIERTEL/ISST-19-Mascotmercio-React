import axios from 'axios';

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


    
}

const apiServiceInstance = new ApiService();
export default apiServiceInstance;
