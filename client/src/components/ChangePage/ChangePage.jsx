import React from "react";
import style from "./ChangePage.module.css"
import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";

const itemsPerPage = 15;
const ChangePage = ({handleNextPage, handlePrevPage, currentPage, videogames})=>{
  
    return(
        <div className={style.container}>
            <div onClick={handlePrevPage} disabled={currentPage === 1}>
                <img src={leftArrow} alt="left arrow" />
            </div>
            
            <span className={style.number}>{currentPage}</span>

            <div onClick={handleNextPage}
              disabled={currentPage === Math.ceil(videogames.length / itemsPerPage)}>
                <img src={rightArrow} alt="right arrow" />
            </div>
            
          </div>
    )
}

export default ChangePage;