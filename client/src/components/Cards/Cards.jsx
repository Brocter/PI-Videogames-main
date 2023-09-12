import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css"

const Cards = ({ videogames }) => {
    return (
      <div className={style.cardsContainer}>
        {videogames.map((videogame) => (
          <Card key={videogame.id} videogame={videogame} />
        ))}
      </div>
    );
  };
  
  export default Cards;