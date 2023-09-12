// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import style from "./SearchBar.module.css";
import { getAllVideogames, search } from "../../redux/actions";
import { useDispatch } from "react-redux";
import SearchSvg from "../SearchSvg/SearchSvg";

const SearchBar = ()=>{

    const [name, setName] = useState("")

    const dispatch = useDispatch();
    useEffect(()=>{
        if(name.length>=1){
            dispatch(search(name.trim()))
        } else dispatch(getAllVideogames())

    },[name,dispatch]);

    const handleClick = (event) => {
        setName(event.target.value);
      }

    return(
       
        <div className= {style.container}>
            
         < SearchSvg/>
        <input onChange = {handleClick} placeholder= 'name...' className = {style.input} type='search' name='searchInput'/>
        
       </div>
   
        
    )
}

export default SearchBar;

