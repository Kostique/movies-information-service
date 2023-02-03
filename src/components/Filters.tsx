import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MySelect } from "./UI/MySelect";
import "../styles/componentStyles/Filters.scss";
import { Genres, Countries, Years } from "../models/DataSelect";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useUrlBuilder } from "../hooks/useUrlBuilder";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  changeCountry,
  changeGenre,
  changeSort,
  changeYear,
} from "../store/reducers/FilterSlice";

export const Filters = () => {
  const { year, country, genre, sort } = useAppSelector(
    (store) => store.FilterReducer
  );
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const [searchParams] = useSearchParams();

  const filters = useRef<HTMLDivElement>(null);
  const [filtersCoord, setCoords] = useState(162);

  const currentPage: number = Number(searchParams.get("page"));
  const { queryParams, countryOld, yearOld, genreOld, sortOld } =
    useUrlBuilder();

  const firstUpdate = useRef(true);

  const bottomOrTop =
    filtersCoord >= 1090
      ? { bottom: "100%", borderBottom: "0" }
      : { top: "100%", borderTop: "0" };
  function handleScroll() {
    if (filters.current !== null) {
      setCoords?.(filters.current["offsetTop"]);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (location.search != `?page=${currentPage}${queryParams}`) {
      navigate(`/movie-list/${id}?page=${currentPage}${queryParams}`);
    }
  }, [currentPage]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (
      countryOld !== country ||
      year !== yearOld ||
      genre !== genreOld ||
      sort !== sortOld
    ) {
      navigate(`/movie-list/${id}?page=1${queryParams}`);
    }
  }, [year, country, genre, sort]);

  function resetFilters() {
    dispatch(changeCountry(""));
    dispatch(changeYear(""));
    dispatch(changeGenre(""));
    dispatch(changeSort("votes.imdb"));
  }

  return (
    <div className="filters" ref={filters}>
      <p className="filters__reset" onClick={resetFilters}>
        Сбросить все фильтры
      </p>
      <div className="filters__select">
        <h2 className="filters__caption">Страны</h2>
        <MySelect
          options={Countries}
          defaultVal={country}
          style={bottomOrTop}
          onChange={changeCountry}
        />
      </div>
      <div className="filters__select">
        <h2 className="filters__caption">Жанры</h2>
        <MySelect
          options={Genres}
          defaultVal={genre}
          style={bottomOrTop}
          onChange={changeGenre}
        />
      </div>
      <div className="filters__select">
        <h2 className="filters__caption">Годы</h2>
        <MySelect
          options={Years}
          defaultVal={year}
          style={bottomOrTop}
          onChange={changeYear}
        />
      </div>
    </div>
  );
};
