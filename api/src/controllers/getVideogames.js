const axios = require( 'axios' );
const { Videogame, Genre } = require ('../db.js');
require( 'dotenv' ).config();
const { API_KEY } = process.env;
const URL_BASE = 'https://api.rawg.io/api/';
const URL_GAME = `${URL_BASE}games?key=${API_KEY}&page_size=25`;

const pageNum = 5;


const getVideogames = async () => {

  let response = [];
  let allResponse = [];

  for ( let i = 1; i < pageNum; i++ ) {
    response = await Promise.all([
      ...response, axios.get( `${URL_GAME}&page=${i}` )
    ]);
  };


  response.forEach(element => {
    allResponse = allResponse.concat(element.data.results);
  });

  // creo el objeto que voy a devolver por cada juego de la api
  const apiDataGames = allResponse.map( ({
      id,
      name,
      //description, llega en el detail
      platforms,
      background_image,
      released,
      rating,
      genres
    }) => ({
      id: id,
      name: name,
      // description: description,
      platforms: platforms.map( p => p.platform.name ),
      image: background_image,
      released: released,
      rating: rating,
      genres: ( genres.map( ( genre ) => genre.name ))
    })
  );
  

  return apiDataGames;
};

module.exports = getVideogames;