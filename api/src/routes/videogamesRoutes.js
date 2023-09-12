const express = require("express");
const router = express.Router();
const getVideogameById = require("../controllers/getVideogameById");
const getVideogames = require("../controllers/getVideogames");
const getVideogamesByName = require("../controllers/getVideogamesByName");
const createVideogame = require("../controllers/createVideogame");
const { Videogame, Genre } = require("../db");


router.get("/", async (req, res) => {
    try {
      const { name } = req.query;
      if (!name) {
        const apiVideogames = await getVideogames();

        const DBVideogames = await Videogame.findAll({
            include: [
                {
                  model: Genre,
                  attributes: ["name"],
                },
              ],
        });
        
        const modifiedVideogames = DBVideogames.map((videogame)=> {const { id,name, plataformas, imagen, Genres} = videogame
        const modifiedVideogame = {
            id:id,
            name: name,
            platforms: plataformas,
            image: imagen,
            genres: Genres.map( ( genre ) => genre.dataValues.name)
        }
        return modifiedVideogame;
        })

        
        const allVideogames = modifiedVideogames.concat(apiVideogames)

        return res.status(200).json(allVideogames);
      }
  
      const videogamesFromAPI = await getVideogamesByName(name);
  
      if (videogamesFromAPI.error) {
        throw new Error(videogamesFromAPI.error);
      }
  
      const DBsearchName = await Videogame.findOne({
        where: {
          name: name,
        },
        include: [
          {
            model: Genre,
            attributes: ["name"],
          },
        ],
      });

      
  
      if (DBsearchName) {

        const DBVideogame = DBsearchName.dataValues;

        
        const { id,name, plataformas, imagen, Genres} = DBVideogame;

        

        const modifiedVideogame = {
            id:id,
            name: name,
            platforms: plataformas,
            image: imagen,
            genres: Genres.map( ( genre ) => genre.dataValues.name)
        }
            
        console.log(modifiedVideogame)
        return res.status(200).json([modifiedVideogame, ...videogamesFromAPI]);
      }
  
      return res.status(200).json(videogamesFromAPI);
    } catch (error) {
      console.error(error.message);
      return res.status(404).send(error.message);
    }
  });

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isNaN(id) && Number.isInteger(Number(id))) {
      const videogame = await getVideogameById(id);
      return res.status(200).json(videogame);
    }

    const DBsearchId = await Videogame.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Genre,
          attributes: ["name"],
        },
      ],
    });

    const {name, plataformas, imagen, Genres, descripcion, fechaDeLanzamiento} = DBsearchId;

    const modifiedVideogame = {
        name: name,
        platforms: plataformas,
        image: imagen,
        description: descripcion,
        released: fechaDeLanzamiento,
        genres: Genres.map( ( genre ) => genre.dataValues.name)
    }

    return res.status(200).json(modifiedVideogame);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name, descripcion, plataformas, imagen, fechaDeLanzamiento, genres } = req.body;

    const genresDB = await Genre.findAll({
      where: {
        name: genres,
      },
    });

    const genresIds = genresDB.map((genre) => genre.id);

    const newGame = await createVideogame(name, descripcion, plataformas, imagen, fechaDeLanzamiento, genresIds);

    return res.status(200).json(newGame);
  } catch (error) {
    console.log(error.message);
    res.status(404).json(error.message);
  }
});

module.exports = router;
