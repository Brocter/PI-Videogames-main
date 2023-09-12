// Card.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import style from "./Card.module.css";
import cardBorder from "../../assets/Card (2).svg";

const Card = ({ videogame }) => {
  const { image, name, genres} = videogame;
  const separated = genres.join(' | ');

  const imageStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '233px',
    height: '157px',
    borderRadius: "5px"
  };

  return (
    <NavLink to={`detail/${videogame.id}`} className={style.link}>
    <div className={style.cardContainer}>
      
        <div className={style.imageContainer}>
          <div style={imageStyle}></div>
        </div>
        <div className={style.textContainer}>
          <h3>{name}</h3>
          <p> {separated}</p>
        </div>
        <img src={cardBorder} alt="card border" />
      
    </div>
    </NavLink>
  );
};

export default Card;
