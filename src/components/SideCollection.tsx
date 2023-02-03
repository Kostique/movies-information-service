import React from "react";
import { movieIcon } from "../img/images";
import "../styles/componentStyles/SideBar.scss";
import { SliderCarousel } from "../components/UI/SliderCarousel";
interface IItem {
  genre: string;
}

export const Item = ({ genre }: IItem) => {
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
      <button className="">Смотреть</button>
    </>
  );
};

export const SideCollection = () => {
  return (
    <div className="sideBar">
      <div className="sideBar-new__collect">
        <h2 className="sideBar-new caption">НОВЫЕ КОЛЛЕКЦИИ</h2>
        <ul className="sideBar-new__list">
          <li className="sideBar-new__list-item">
            <img src={movieIcon} alt="заставка"></img>
            <div className="text">
              <span>тут будет какое то число</span>
              <h3>А здесь названия фильма</h3>
            </div>
          </li>
          <li className="sideBar-new__list-item">
            <img src={movieIcon} alt="заставка"></img>
            <div className="text">
              <span>тут будет какое то число</span>
              <h3>А здесь названия фильма</h3>
            </div>
          </li>
          <li className="sideBar-new__list-item">
            <img src={movieIcon} alt="заставка"></img>
            <div className="text">
              <span>тут будет какое то число</span>
              <h3>А здесь названия фильма</h3>
            </div>
          </li>
          <li className="sideBar-new__list-item">
            <img src={movieIcon} alt="заставка"></img>
            <div className="text">
              <span>тут будет какое то число</span>
              <h3>А здесь названия фильма</h3>
            </div>
          </li>
          <li className="sideBar-new__list-item">
            <img src={movieIcon} alt="заставка"></img>
            <div className="text">
              <span>тут будет какое то число</span>
              <h3>А здесь названия фильма</h3>
            </div>
          </li>
        </ul>
      </div>
      <div className="sideBar-popular__collect">
        <h2 className="sideBar-popular caption">ПОПУЛЯРНЫЕ КОЛЛЕКЦИИ</h2>
        <SliderCarousel>
          <div className="slider-item item-1">
            <Item genre="ФИЛЬМЫ" />
          </div>
          <div className="slider-item item-2">
            <Item genre="СЕРИАЛЫ" />
          </div>
          <div className="slider-item item-3">
            <Item genre="МУЛЬТФИЛЬМЫ" />
          </div>
          <div className="slider-item item-4">
            <Item genre="АНИМЕ" />
          </div>
        </SliderCarousel>
      </div>
    </div>
  );
};
