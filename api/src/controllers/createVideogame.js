const { Videogame, Genres } = require("../db")

const createVideogame = async ( name, descripcion, plataformas, imagen, fechaDeLanzamiento, GenreIds)=>{
    try {
        const newVideogame = await Videogame.create({name, descripcion, plataformas, imagen, fechaDeLanzamiento,GenreIds})
        
        const videogame = await newVideogame.setGenres(GenreIds);

        return videogame;
    } catch (error) {
        console.log(error)
        throw Error("Failed to create videogame")
    }

}

module.exports = createVideogame;