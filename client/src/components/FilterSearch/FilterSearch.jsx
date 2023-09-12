import React from "react";
import CreateButt from "../../assets/CreateButt.svg";
import style from "./FileterSearch.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Link } from "react-router-dom";

const FilterSearch = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const handleABCOrder = (e) => {
    dispatch(actions.orderABC(e.target.value));
  };

  const handleGenreFilter = (e) => {
    dispatch(actions.filterByGenres(e.target.value));
  };

  const handleRatingFilter = (e) => {
    dispatch(actions.filterByRating(e.target.value));
  };

  return (
    <div>
      <Link to={"/form"}>
    <img className={style.bottonCrear} src={CreateButt} alt="" />
    </Link>
    <div className={style.container}>
      <select className={style.abc} onChange={handleABCOrder}>
        <option></option>
        <option value="A">A-Z</option>
        <option value="Z">Z-A</option>
      </select>

      <select className={style.oGenre} name="genres" onChange={handleGenreFilter}>
        <option></option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <select className={style.rating} onChange={handleRatingFilter}>
        <option></option>
        <option value="D">Top ratings</option>
        <option value="A">Lowest ratings</option>
      </select>
    </div>
    </div>
  );
};

export default FilterSearch;
