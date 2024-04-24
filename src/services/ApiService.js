import axios from 'axios';
import {useParams} from 'react-router-dom/dist';
import { useNavigate } from 'react-router-dom';

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

    getEmailByCliente = async (usuario) => {
        try {
          const response = await axios.get(Cliente_URL + "/email", {
            params: {
              usuario: usuario
            }
          });
      
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error('Error al obtener el email del usuario');
          }
        } catch (error) {
          console.error('Error al obtener el email del usuario:', error);
          throw error;
        }
       };


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
    getEmailByPropietario = async (usuario) => {
        try {
          const response = await axios.get(Propietario_URL + "/email", {
            params: {
              usuario: usuario
            }
          });
      
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error('Error al obtener el email del usuario');
          }
        } catch (error) {
          console.error('Error al obtener el email del usuario:', error);
          throw error;
        }
      };



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
    //Petición a la base de datos de una tienda
    getTiendaById = async (idTienda) => {
        try {
            const response = await axios.get(USER_API_BASE_URL_TIENDAS + '/' + idTienda);
            return response.data;
        } catch (error) {
            console.error('Error fetching tiendas:', error);
            throw error; // Re-throw the error to handle it in the calling code
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

    //Petición a la base de datos de un servicio
    getServicioById = async (idServicio) => {
        try {
            const response = await axios.get(USER_API_BASE_URL_SERVICIOS + '/' + idServicio);
            return response.data;
        } catch (error) {
            console.error('Error fetching tiendas:', error);
            throw error; // Re-throw the error to handle it in the calling code
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

    //Post cliente
    enviarDatosCliente= async (usuario,contraseña,email) => {
        try {
            console.log(usuario,contraseña,email);
            const res = await axios.post (Cliente_URL + "/login", {
                "usuario":usuario,
                "contraseña":contraseña,
                "email":email,
            });
            console.log(res.data);

             if (res.data.message === "Cliente no existe") 
             {
               alert("Cliente no existe");
             } 
             else if(res.data.message === "Login Success")
             { 
                alert ("Se ha iniciado sesión como cliente");
             } 
                // Devuelve la respuesta
            return res.data;
        } catch (err) {
        console.error(err);
        alert(err);
        }
        };
   //Post propietario
enviarDatosPropietario = async (usuario, contraseña, email) => {
    try {
        console.log(usuario, contraseña, email);
        const res = await axios.post(Propietario_URL + "/login", {
            "usuario": usuario,
            "contraseña": contraseña,
            "email": email,
        });
        console.log(res.data);

        if (res.data.message === "Propietario no existe") {
            alert("Propietario no existe");
        } else if (res.data.message === "Login Success") {
            alert("Se ha iniciado sesión como propietario");
        }

        // Devuelve la respuesta
        return res.data;
    } catch (error) {
        console.error(error);
        alert(error);
    }
};
      



 // Método para actualizar una tienda
 actualizarTienda = async (idTienda, tiendaActualizada) => {
    try {
        // URL de la API para actualizar el servicio
        const url = `${USER_API_BASE_URL_TIENDAS}/${idTienda}`;

        // Realizar la solicitud PUT con Axios
        const response = await axios.put(url, tiendaActualizada);

        // Devolver los datos de respuesta si es necesario
        return response.data;
    } catch (error) {
        // Manejar errores
        throw error; // Lanza el error para manejarlo en el componente
    }
};


    // Método para actualizar un servicio
actualizarServicio = async (idServicio, servicioActualizado) => {
    try {
        // URL de la API para actualizar el servicio
        const url = `${USER_API_BASE_URL_SERVICIOS}/${idServicio}`;

        // Realizar la solicitud PUT con Axios
        const response = await axios.put(url, servicioActualizado);

        // Devolver los datos de respuesta si es necesario
        return response.data;
    } catch (error) {
        // Manejar errores
        throw error; // Lanza el error para manejarlo en el componente
    }
};

};

const apiServiceInstance = new ApiService();
export default apiServiceInstance;
