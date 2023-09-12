import React from "react"
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css"
import LogoAndSonic from "../LogoAndSonic/LogoAndSonic";
import { Link } from "react-router-dom";


const NavBar = ({show}) => {
    return (
        <div>
            {show && (
        <div className={style.nav}>

            <div className={style.logoContainer}>
            <Link to={"/home"}>
            <LogoAndSonic/>
            </Link>
            </div>
            <div className={style.searchContainer}>
            <SearchBar/>
            </div>
        </div>)}
        </div>
    )
}

export default NavBar;