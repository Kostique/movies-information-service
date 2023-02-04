import React from "react";
import { IPersons } from "../models/IMovieItem";

interface IActor {
  actors: IPersons[];
}

export const ActorList = ({ actors }: IActor) => {
  return (
    <div className="movie-item__persons-list">
      <h4>В главных ролях</h4>
      <div className="actor-list">
        {actors
          .slice(0, 5)
          .filter((item) => item.name)
          .map((item, i) => (
            <div key={i} className="actor-item">
              <div className="actor-photo">
                <img src={item.photo}></img>
              </div>
              <a className="actor-name">{item.name}</a>
            </div>
          ))}
      </div>
      <div className="actors-page">
        <p>Посмотреть еще...</p>
      </div>
    </div>
  );
};
