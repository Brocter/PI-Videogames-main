import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DetailContent from '../components/DetailContent/DetailContent'


const Detail = () => {
  const [videogame, setVideogame] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios(`http://localhost:3001/videogames/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setVideogame(data);
        } else {
          window.alert('No hay videojuegos con ese ID');
        }
      })
      .catch(error => {
        console.error('Error fetching videogame data:', error);
      });
  }, [id]);


  return (
    <>
      <DetailContent id={id} videogame={{...videogame,videogame}} />
    </>
  );
};

export default Detail;