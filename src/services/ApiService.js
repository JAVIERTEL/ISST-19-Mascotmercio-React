import axios from 'axios';
import {useParams} from 'react-router-dom/dist';

const USER_API_BASE_URL_TIENDAS = "http://localhost:8085/api/tienda";
const USER_API_BASE_URL_SERVICIOS = "http://localhost:8085/api/servicio";

 

class ApiService{
    
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
