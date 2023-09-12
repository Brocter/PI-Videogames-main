import { CREATE_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_GENRES, SEARCH, ORDER_ABC, FILTER_BY_GENRES, FILTER_BY_RATING} from "./action-types";

const initialState = {
  videogames: [],
  videogameDetail: {},
  genres: [],
  backupVidegames: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return { ...state, videogames: action.payload, backupVidegames: action.payload };

    case GET_VIDEOGAME_DETAIL:
      return { ...state, videogameDetail: action.payload };

    case CREATE_VIDEOGAME:
      return { ...state, videogames: [...state.videogames, action.payload] };

    case GET_GENRES:
      return { ...state, genres: action.payload };

    case SEARCH:
      return { ...state, videogames: action.payload };

    case ORDER_ABC:
      
      let orderedGames = [...state.videogames];
      if (action.payload === "A") {
        orderedGames.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "Z") {
        orderedGames.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        videogames: orderedGames, // Actualizar el estado con videojuegos ordenados
      };

    case FILTER_BY_GENRES:
      const filteredGames = [...state.backupVidegames].filter((game) => game.genres.find((genre)=> genre === action.payload));
      return {
        ...state,
        videogames: filteredGames, // Actualizar el estado con videojuegos filtrados por género
      };

    case FILTER_BY_RATING:
      let orderedArr = [...state.videogames];
      if (action.payload === "A") {
        orderedArr.sort((a, b) => a.rating - b.rating);
      } else if (action.payload === "D") {
        orderedArr.sort((a, b) => b.rating - a.rating);
      }
      return {
        ...state,
        videogames: orderedArr,
      };

    default:
      return { ...state };
  }
};

export default reducer;
