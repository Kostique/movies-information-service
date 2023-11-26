import React, { useEffect } from "react";
import { icon404, movieIcon } from "../img/images";
import "../styles/componentStyles/SideBar.scss";
import { SliderCarousel } from "../components/UI/SliderCarousel";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchCollection } from "../store/reducers/ActionCreators";
import { Link } from "react-router-dom";
interface IItem {
  genre: string;
  path: string;
}

export const Item = ({ genre, path }: IItem) => {
  return (
    <>
      <p className="slider-caption">
        ЛУЧШИЕ
        <br />
        {genre}
        <br />
        2015-2021
        <br />
        ГОДОВ
      </p>
      <Link to={path}>
        <button>Смотреть</button>
      </Link>
    </>
  );
};

export const SideCollection = () => {
  const { movies, isLoading, error } = useAppSelector(
    (store) => store.CollectionReducer
  );
  const dispatch = useAppDispatch();
  const { docs } = movies;

  useEffect(() => {
    dispatch(fetchCollection());
  }, []);

  return (
    <div className="sideBar">
      <div className="sideBar-new__collect">
        <h2 className="sideBar-new caption">НОВЫЕ ФИЛЬМЫ</h2>
        <ul className="sideBar-new__list">
          {docs.map((item) => {
            return (
              <Link key={item.id} to={`/movie-item/${item.id}`}>
                <li className="sideBar-new__list-item">
                  <img
                    src={
                      item.poster && item.poster.previewUrl
                        ? item.poster.previewUrl
                        : icon404
                    }
                    alt="постер_фильма"
                  ></img>
                  <div className="text">
                    <h3>{item.name ? item.name : item.alternativeName}</h3>
                    <span>{item.name && item.alternativeName}</span>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="sideBar-popular__collect">
        <h2 className="sideBar-popular caption">ПОПУЛЯРНЫЕ КОЛЛЕКЦИИ</h2>
        <SliderCarousel>
          <div className="slider-item item-1">
            <Item
              genre="ФИЛЬМЫ"
              path="/movie-list/movie?year=2015-2021&sort=votes.imdb"
            />
          </div>
          <div className="slider-item item-2">
            <Item
              genre="СЕРИАЛЫ"
              path="/movie-list/tv-series?year=2015-2021&sort=votes.imdb"
            />
          </div>
          <div className="slider-item item-3">
            <Item
              genre="МУЛЬТИКИ"
              path="/movie-list/cartoon?year=2015-2021&sort=votes.imdb"
            />
          </div>
          <div className="slider-item item-4">
            <Item
              genre="АНИМЕ"
              path="/movie-list/anime?year=2015-2021&sort=votes.imdb"
            />
          </div>
        </SliderCarousel>
      </div>
    </div>
  );
};
