import { CREATE_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_GENRES, SEARCH, ORDER_ABC, FILTER_BY_GENRES, FILTER_BY_RATING } from "./action-types";
import axios from "axios"

export const getAllVideogames = () => {
    return async function (dispatch) {
      try {
        const timestamp = Date.now();
        const response = await axios.get(`http://localhost:3001/videogames?timestamp=${timestamp}`);
        dispatch({
          type: GET_ALL_VIDEOGAMES,
          payload: response.data,
        });
      } catch (error) {
        
        console.error("Error al obtener la lista de videojuegos:", error);
      }
    };
  };
  
  // Función para obtener los detalles de un videojuego específico
  export const getVideogameDetail = (id) => {
    return async function (dispatch) {
      try {
        const timestamp = Date.now();
        const response = await axios.get(`http://localhost:3001/videogames/${id}?timestamp=${timestamp}`);
        dispatch({
          type: GET_VIDEOGAME_DETAIL,
          payload: response.data,
        });
      } catch (error) {
        console.error(`Error al obtener los detalles del videojuego con ID ${id}:`, error);
     
      }
    };
  };
 
  export const createVideogame = (videogame) => {
    return async function (dispatch) {
      const { name, descripcion, plataformas, imagen, fechaDeLanzamiento, rating, genres } = videogame;
  
      
      if (!name || !descripcion || !plataformas || !imagen || !fechaDeLanzamiento || !rating || !genres) {
        
        throw Error("Todos los campos son requeridos");
      }
  
      try {
        const response = await axios.post("http://localhost:3001/videogames/create", {
          name,
          descripcion,
          plataformas,
          imagen,
          fechaDeLanzamiento,
          rating,
          genres,
        });
  
        dispatch({
          type: CREATE_VIDEOGAME,
          payload: response.data,
        });
      } catch (error) {
        console.error(error);
        alert("Error al crear el videojuego");
      }
    };
  };
  
  export const getGenres = ()=>{
    return async function(dispatch){
      const response = await axios.get("http://localhost:3001/genres");
      const genresNames = response.data.map((genre)=>genre.name)
      dispatch({
        type:GET_GENRES,
        payload: genresNames 
      })
    }
  }
  
  export const search = (name)=>{
    return async function(dispatch){
      const response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
      dispatch({
        type: SEARCH,
        payload: response.data
      })
    }
  }

  export const orderABC = (order) => {
    return {
      type: ORDER_ABC,
      payload: order
    }
  };

  export const filterByGenres = (genre) => {
    return {
      type: FILTER_BY_GENRES,
      payload: genre
    }
  };

  export const filterByRating = (order) => {
    return {
      type: FILTER_BY_RATING,
      payload: order
    }
  };




