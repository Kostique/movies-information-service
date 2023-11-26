import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAllMovies } from "../store/reducers/ActionCreators";
import SVGSelector from "../svg/SvgSelector";
import "../styles/componentStyles/MovieList.scss";
import { Spinner } from "../components/UI/Spinner";
import { icon404 } from "../img/images";
import { Filters } from "../components/Filters";
import Pagination from "../components/UI/Pagination";
import { ErrorMessage } from "../components/Error";
import {
  changeCountry,
  changeYear,
  changeGenre,
  changeSort,
} from "../store/reducers/FilterSlice";
import { useUrlBuilder } from "../hooks/useUrlBuilder";
import { MySelect } from "../components/UI/MySelect";
import { Sort } from "../models/DataSelect";

export const MovieList = () => {
  const { year, country, genre, sort } = useAppSelector(
    (store) => store.FilterReducer
  );
  const { movies, isLoading, error } = useAppSelector(
    (store) => store.MovieReducer
  );
  const dispatch = useAppDispatch();
  const {
    sortOld,
    genreOld,
    yearOld,
    countryOld,
    queryParams,
    oldQueryParams,
  } = useUrlBuilder();
  const { docs } = movies;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const currentPage: number = Number(searchParams.get("page"));

  const firstUpdate = useRef(true);
  function setId(id: string) {
    switch (id) {
      case "anime":
        return "Аниме";
      case "movie":
        return "Фильмы";
      case "cartoon":
        return "Мультфильмы";
      case "tv-series":
        return "Сериалы";
      default:
        break;
    }
  }

  useEffect(() => {
    window.scroll(1, 0);
    if (!sort) {
      return;
    }
    if (
      year == yearOld &&
      country == countryOld &&
      genre == genreOld &&
      sort == sortOld
    ) {
      dispatch(fetchAllMovies(id, currentPage, year, country, genre, sort));
      return;
    }
    if (currentPage == 1 && queryParams == oldQueryParams) {
      dispatch(fetchAllMovies(id, currentPage, year, country, genre, sort));
    }
  }, [genre, year, sort, country, queryParams, oldQueryParams]);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    dispatch(fetchAllMovies(id, currentPage, year, country, genre, sort));
    window.scroll(1, 0);
  }, [id, currentPage]);

  if (error.name) {
    return (
      <div className="movie-wrapper">
        <div className="movie-list">
          <div className="movie-list__main-container">
            <div className="movie-list__filters">
              <Filters />
            </div>
            <div className="movie-list__catalog">
              <h1>{id}</h1>
              <ErrorMessage error={error} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <div className="movie-list__main-container">
          <div className="movie-list__filters">
            <Filters />
          </div>
          <div className="movie-list__catalog">
            <div className="movie-list__caption">
              <h4>{setId(id)}</h4>
              <div className="movie-list__filters-active">
                {genre && (
                  <div>
                    <span
                      onClick={() => {
                        dispatch(changeGenre(""));
                      }}
                    >
                      <SVGSelector id="cross" />
                    </span>
                    <span>{genre}</span>
                  </div>
                )}
                {country && (
                  <div>
                    <span
                      onClick={() => {
                        dispatch(changeCountry(""));
                      }}
                    >
                      <SVGSelector id="cross" />
                    </span>
                    <span>{country}</span>
                  </div>
                )}
                {year && (
                  <div>
                    <span
                      onClick={() => {
                        dispatch(changeYear(""));
                      }}
                    >
                      <SVGSelector id="cross" />
                    </span>
                    <span>{year}</span>
                  </div>
                )}
              </div>
              <div className="movie-list__sort-select">
                <MySelect
                  defaultVal={sort}
                  options={Sort}
                  onChange={changeSort}
                  style={{ top: "100%", borderTop: "0" }}
                />
              </div>
            </div>
            {isLoading ? (
              <div className="movie-list__loading">
                <Spinner />
              </div>
            ) : (
              <div className="list">
                {!docs.length && (
                  <div className="movie-list__empty-text">
                    <h4>Ничего не найдено.</h4>
                    <p>Попробуйте изменить параметры фильтра</p>
                  </div>
                )}

                {docs.map((el) => {
                  return (
                    <div
                      className="item"
                      key={el.id}
                      onClick={(e: any) => {
                        if (
                          e.target.tagName !== "BUTTON" &&
                          e.target.tagName !== "svg"
                        ) {
                          navigate(`/movie-item/` + el.id);
                        }
                      }}
                    >
                      <div className="item__desc">
                        <img
                          src={el.poster ? el.poster.previewUrl : icon404}
                          alt="иконка"
                        ></img>
                        <div className="desc-headers">
                          <h4>{el.name || el.alternativeName}</h4>
                          <p className="desc-text">
                            {el.name && el.alternativeName && (
                              <span>{el.alternativeName}</span>
                            )}
                            {el.year && <span>{el.year}</span>}
                            {el.movieLength && (
                              <span>{el.movieLength} min</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="item__features">
                        <p className="item-rating">
                          <span className="points">
                            {el.rating.imdb ? el.rating.imdb.toFixed(1) : ""}
                          </span>
                          {el.votes.imdb
                            ? " " +
                              new Intl.NumberFormat().format(el.votes.imdb)
                            : ""}
                        </p>
                        <button
                          className="btn-favorite"
                          onClick={() => console.log("favorite")}
                        >
                          Буду смотреть <SVGSelector id="favorite" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {movies.total > 10 && <Pagination totalMovies={movies.total} />}
    </div>
  );
};
