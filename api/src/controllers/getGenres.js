const axios = require("axios");
const { Genre } = require("../db");

const fetchGenresFromAPI = async () => {
  try {
    const response = await axios.get("https://api.rawg.io/api/genres", {
      params: {
        key: process.env.API_KEY, 
      },
    });

    const genresFromAPI = response.data.results;
    return genresFromAPI;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch genres from the API");
  }
};

const saveGenresToDatabase = async (genres) => {
  try {
    for (const genre of genres) {
      await Genre.findOrCreate({
        where: { name: genre.name },
      });
    }
    console.log("Genres saved to the database successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save genres to the database");
  }
};

const getGenresFromDatabase = async () => {
  try {
    const genres = await Genre.findAll();
    return genres;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch genres from the database");
  }
};

module.exports = {
  fetchGenresFromAPI,
  saveGenresToDatabase,
  getGenresFromDatabase,
};