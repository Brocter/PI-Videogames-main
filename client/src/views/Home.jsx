/* eslint-disable no-unused-vars */
import React, { useState, useEffect,Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import Cards from "../components/Cards/Cards";
import FilterSearch from "../components/FilterSearch/FilterSearch";
import ChangePage from "../components/ChangePage/ChangePage";
import Loading from "../components/Loading/Loading";


const itemsPerPage = 15;

const HomePage = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(actions.getAllVideogames());
    dispatch(actions.getGenres());
  }, [dispatch]);

 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  console.log(videogames);
  const currentVideogames = videogames.slice(startIndex, endIndex);

  // Función para cambiar a la página anterior
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Función para cambiar a la página siguiente
  const handleNextPage = () => {
    const lastPage = Math.ceil(videogames.length / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, lastPage));
  };

  return (
    
        <div>
          <Suspense fallback={<Loading/>}>
          <FilterSearch/>
          <Cards videogames={currentVideogames} />
          <ChangePage videogames={currentVideogames} currentPage={currentPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage}/>
          </Suspense>
        </div>
      
    
  );
};

export default HomePage;