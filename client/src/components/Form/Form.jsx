/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getGenres } from "../../redux/actions";
import style from "./Form.module.css"
import { useNavigate } from "react-router-dom";



const allPlatforms = ["PC","PlayStation 5","Xbox One","PlayStation 4","Xbox Series S/X","Nintendo Switch","iOS","Android","Nintendo 3DS","Nintendo DS","Nintendo DSi","macOS","Linux","Xbox 360","Xbox","PlayStation 3","PlayStation 2","PlayStation","PS Vita","PSP","Wii U","Wii","GameCube","Nintendo 64","Game Boy Advance","Game Boy Color","Game Boy","SNES","NES","Classic Macintosh","Apple II","Commodore / Amiga","Atari 7800","Atari 5200","Atari 2600","Atari Flashback","Atari 8-bit","Atari ST","Atari Lynx","Atari XEGS","Genesis","SEGA Saturn","SEGA CD","SEGA 32X","SEGA Master System","Dreamcast","3DO","Jaguar","Game Gear","Neo Geo"];

const Form = () => {

  let MAX_DESCRIPCION_LENGTH = 2200;
  let MAX_NAME_LENGTH = 30;
  let MAX_NUM_RATING = 5;
  let MIN_NUM_RATING = 0;
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres); // Obtener los géneros del estado global

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    imagen: "",
    descripcion: "",
    plataformas: [],
    fechaDeLanzamiento: "",
    rating: "",
    genres: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let truncatedValue = value;

    if (name === "descripcion") {
      truncatedValue = value.slice(0, MAX_DESCRIPCION_LENGTH);
    } else if (name === "name") {
      truncatedValue = value.slice(0, MAX_NAME_LENGTH);
    } else if (name === "rating") {
      const numValue = parseInt(value, 10);
      if (numValue < MIN_NUM_RATING) {
        truncatedValue = MIN_NUM_RATING.toString();
      } else if (numValue > MAX_NUM_RATING) {
        truncatedValue = MAX_NUM_RATING.toString();
      }
    }
    setFormData({
      ...formData,
      [name]: truncatedValue,
    });
  };

  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      genres: selectedGenres,
    });
  };

  const handlePlatformChange = (e) => {
    const selectedPlatforms = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      plataformas: selectedPlatforms,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     dispatch(createVideogame(formData));
      alert('Videogame Created! :D');
      navigate('/home');
      setFormData({
        name: "",
        imagen: "",
        descripcion: "",
        plataformas: [],
        fechaDeLanzamiento: "",
        rating: "",
        genres: [],
      })
    } catch (error) {
      // Handle error from createVideogame action
      console.error('Error creating videogame:', error);
      alert('Error creating videogame. Please check the form and try again.');
      // You might want to display more user-friendly error messages here
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <div >
          <input className={style.title} type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div >
          <input className={style.uploadImg} type="text" name="imagen" value={formData.imagen} onChange={handleInputChange} />
        </div>
        <div>
          <textarea className= {style.descripcionGame} name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
        </div>
        <div>
          <select className={style.plataformasCreate} multiple name="plataformas" value={formData.plataformas} onChange={handlePlatformChange}>
          <option></option>
            {allPlatforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input className={style.fecha}
            type="date"
            name="fechaDeLanzamiento"
            value={formData.fechaDeLanzamiento}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input className={style.rateado} type="number" name="rating" value={formData.rating} onChange={handleInputChange} />
        </div>
        <div>
          <select className={style.genresCreate} multiple name="genres" value={formData.genres} onChange={handleGenreChange}>
            <option></option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <button className={style.submitButt} type="submit"></button>
      </form>
    </div>
  );
};

export default Form;





