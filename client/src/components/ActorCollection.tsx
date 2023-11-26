import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { icon404 } from '../img/images';
import { IPersons } from '../models/IMovieItem';
import { castItemsUpdate, castNameUpdate } from '../store/reducers/CastSlice';

interface IActor {
  actors: IPersons[];
  id: number;
  name: string;
}

export const ActorCollection = ({ actors, id, name }: IActor) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function navigateCast() {
    dispatch(castNameUpdate(name));
    dispatch(castItemsUpdate(actors));
    navigate('/cast-list/');
  }
  return (
    <div className="movie-item__persons-list">
      <h4>В главных ролях</h4>
      <div className="actor-list">
        {actors
          .slice(0, 5)
          .filter((item) => item.name)
          .map((item, i) => (
            <Link to={`/actor-item/${item.id}`} key={i} className="actor-item">
              <div className="actor-photo">
                <img src={item.photo ? item.photo : icon404}></img>
              </div>
              <p className="actor-name">{item.name}</p>
            </Link>
          ))}
      </div>
      <div className="actors-page__link">
        <p onClick={navigateCast}>Посмотреть еще...</p>
      </div>
    </div>
  );
};
