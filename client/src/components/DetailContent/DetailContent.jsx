import style from './DetailContent.module.css';
import React from 'react';
import DOMPurify from 'dompurify';
import ImageDetail from '../ImageDetail/ImageDetail';
import textCard from "../../assets/TextCard.svg"
import descriptionCard from "../../assets/descriptionCard.svg"



const DetailContent = ({ videogame }) => {

  const plataformasUnidas = videogame.platforms?.join(", ");
  const generosUnidos = videogame.genres?.join(", ")

 
  const sanitizeDescription = (html) => {
    return DOMPurify.sanitize(html);
  };
  return (
    <div className={style.container}>
      <ImageDetail img={videogame.image}/>
      <div className={style.textCont}>
        <h1>{videogame.name}</h1>
        <div className={style.cardContainer}>
        <p><b>Rating: </b> {videogame.rating}</p>
        <p><b>Released: </b> {videogame.released}</p>
        <p><b>Platforms: </b> {plataformasUnidas}</p>
        <p><b>Genres: </b>{generosUnidos}</p> 
        </div>
        <img src={textCard} alt="text card" />
      </div>
      <div className={style.description}>
        <p dangerouslySetInnerHTML={{ __html: sanitizeDescription(videogame.description) }}></p>
      </div>
      <img src={descriptionCard} alt="description card" />
    </div>
  );
};

export default DetailContent;
