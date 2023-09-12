const axios = require("axios");
const URL_BASE = 'https://api.rawg.io/api/games';
require( 'dotenv' ).config();
const { API_KEY } = process.env;

const getVideogamesByName = async (name) => {
  try {
    const response = await axios.get(`${URL_BASE}`, {
      params: {
        key: API_KEY,
        search: name,
      },
    });
    const videogames = response.data.results;

    if (!videogames.length) return { error: "There are no videogames with that name" };

    const apiDataGames = videogames.map( ({
      id,
      name,
      
      platforms,
      background_image,
      released,
      rating,
      genres
    }) => ({
      id: id,
      name: name,
      
      platforms: platforms.map( p => p.platform.name ),
      image: background_image,
      released: released,
      rating: rating,
      genres: ( genres.map( ( genre ) => genre.name ))
    })
  );
  
  return apiDataGames;
   
  } catch (error) {
    console.error(error.message);
    throw Error("Failed to fetch videogame");
  }
};

module.exports = getVideogamesByName;