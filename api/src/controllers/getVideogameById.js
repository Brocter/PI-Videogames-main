const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games`;


const getVideogameById = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`, {
      params: {
        key: API_KEY,
      },
    });

    const videogameData = response.data;

    if (!videogameData) throw Error("Videogame not found");

    const  {name,
    description, 
    platforms,
    background_image,
    released,
    rating,
    genres
  } = videogameData;

  const modifiedData = {
      name: name,
      description: description,
      platforms: platforms.map( p => p.platform.name ),
      image: background_image,
      released: released,
      rating: rating,
      genres: ( genres.map( ( genre ) => genre.name ))
  }
     
  return modifiedData;
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch videogame");
  }
};

module.exports = getVideogameById;
