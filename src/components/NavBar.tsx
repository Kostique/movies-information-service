import { useEffect, useState } from "react";
import SvgSelector from "../svg/SvgSelector";
import { DropDown } from "./UI/DropDown";
import MyInput from "./UI/MyInput";
import "../styles/componentStyles/NavBar.scss";
import "../styles/UIStyles/MyInput.scss";
import "../styles/UIStyles/DropDown.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  changeCountry,
  changeGenre,
  changeYear,
} from "../store/reducers/FilterSlice";
import { fetchListMovies } from "../store/reducers/ActionCreators";
import { listCleaner } from "../store/reducers/ListSlice";
import { icon404 } from "../img/images";
const selectOptions = [
  { value: "action", body: "Боевик" },
  { value: "millitary", body: "Военный" },
  { value: "detective", body: "Детектив" },
  { value: "children", body: "Детский" },
  { value: "drama", body: "Драма" },
  { value: "comedy", body: "Комедия" },
  { value: "crime", body: "Криминал" },
  { value: "melodrama", body: "Мелодрама" },
  { value: "thriller", body: "Триллер" },
  { value: "horror", body: "Ужасы" },
  { value: "fiction", body: "Фантастика" },
  { value: "fantasy", body: "Фэнтези" },
];
export const NavBar = () => {
  const { movies, isLoading, error } = useAppSelector(
    (store) => store.ListReducer
  );
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState("");
  const [searchByName, setSearchByName] = useState("");

  function resetFilters() {
    dispatch(changeCountry(""));
    dispatch(changeYear(""));
    dispatch(changeGenre(""));
  }

  useEffect(() => {
    if (!searchByName) {
      dispatch(listCleaner());
      return;
    }
    console.log(movies.docs);

    const timeOut = setTimeout(() => {
      dispatch(fetchListMovies(searchByName));
    }, 700);
    return () => clearTimeout(timeOut);
  }, [searchByName]);

  useEffect(() => {
    console.log(location);

    if (filter) {
      dispatch(changeGenre(filter));
      navigate(`/movie-list/movie?page=1&sort=votes.imdb&genre=${filter}`);
    }
  }, [filter]);

  return (
    <div className="header">
      <div className="header__logo">
        <SvgSelector id="svgLogo" />
      </div>
      <div>
        <ul className="header__menu">
          <li className="header__menu-item">
            <Link
              to="home"
              className={location.pathname.includes("home") ? "active" : ""}
            >
              Главная
            </Link>
          </li>
          <li className="header__menu-item">
            <Link
              to={"/collection"}
              className={
                location.pathname.includes("collection") ? "active" : ""
              }
            >
              Подбороки
            </Link>
          </li>
          <li className="header__menu-item">
            <DropDown
              defaultValue={"По жанру"}
              options={selectOptions}
              onChange={setFilter}
              value={filter}
            />
          </li>
          <li className="header__menu-item">
            <Link
              to={`/movie-list/movie?page=1&sort=votes.imdb`}
              className={
                location.pathname.includes("movie", 11) ? "active" : ""
              }
              onClick={resetFilters}
            >
              Фильмы
            </Link>
          </li>
          <li className="header__menu-item">
            <Link
              to={`/movie-list/tv-series?page=1&sort=votes.imdb`}
              className={
                location.pathname.includes("tv-series", 11) ? "active" : ""
              }
              onClick={resetFilters}
            >
              Сериалы
            </Link>
          </li>
          <li className="header__menu-item">
            <Link
              to={`/movie-list/cartoon?page=1&sort=votes.imdb`}
              className={
                location.pathname.includes("cartoon", 11) ? "active" : ""
              }
              onClick={resetFilters}
            >
              Мультфильмы
            </Link>
          </li>
          <li className="header__menu-item">
            <Link
              to={`/movie-list/anime?page=1&sort=votes.imdb`}
              className={
                location.pathname.includes("anime", 11) ? "active" : ""
              }
              onClick={resetFilters}
            >
              Аниме
            </Link>
          </li>
          <li className="header__menu-item">
            <Link
              to={"/actors"}
              className={location.pathname.includes("actors") ? "active" : ""}
            >
              Актеры
            </Link>
          </li>
        </ul>
      </div>
      <div className="header__input">
        <MyInput
          placeholder="Поиск по сайту"
          value={searchByName}
          onChange={setSearchByName}
        />

        {movies.docs.length > 1 && (
          <ul className="input-list">
            {movies.docs.map((item, index) => (
              <Link
                to={`/movie-item/${item.id}`}
                key={index}
                className="input-item"
                onClick={() => setSearchByName("")}
              >
                <div>
                  <span className="item-icon">
                    <img
                      src={
                        item.poster != null &&
                        item.poster.previewUrl.length > 10
                          ? item.poster.previewUrl
                          : icon404
                      }
                    ></img>
                  </span>
                  <div className="item-name">
                    <p>{item.name ? item.name : item.alternativeName}</p>
                    <span>{item.alternativeName && item.alternativeName}</span>
                  </div>
                </div>
                <span className="item-rating">
                  {item.rating.imdb ? item.rating.imdb : ""}
                </span>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
