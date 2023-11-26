import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../components/UI/Spinner';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { icon404 } from '../img/images';
import { IPersons } from '../models/IMovieItem';
import { fetchItem } from '../store/reducers/ActionCreators';
import '../styles/componentStyles/CastList.scss';
import SVGSelector from '../svg/SvgSelector';
const CastList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(1, 0);
  }, []);

  const { items, name } = useAppSelector((state) => state.persistedReducer);
  console.log(items, name);

  return (
    <div className="cast">
      <div className="cast__header">
        <button onClick={() => navigate(-1)} className="movie-item__btn-back">
          <SVGSelector id="btnBack" />
        </button>
        <h1>
          <span>Актерский состав фильма:</span> {name}
        </h1>
      </div>
      <div className="cast__actors">
        <h4>Все актеры:</h4>
        <div className="cast__list">
          {items
            .filter((item) => {
              return item.profession === 'актеры';
            })
            .map((item, i) => (
              <Link to={`/actor-item/${item.id}`} key={i} className="actor-item">
                <div className="actor-item">
                  <img className="actor-photo" src={item.photo ? item.photo : icon404}></img>
                </div>
                <p className="actor-name">{item.name}</p>
                <p className="actor-nickname">{item.description}</p>
              </Link>
            ))}
        </div>
        <h4>Съемочная группа:</h4>
        <div className="cast__list">
          {items
            .filter((item) => {
              if (item.profession !== 'актеры' && item.profession !== 'актеры дубляжа') {
                return item;
              }
            })
            .map((item, i) => (
              <Link to={`/actor-item/${item.id}`} key={i} className="actor-item">
                <div className="actor-item">
                  <img className="actor-photo" src={item.photo ? item.photo : icon404} alt="" />
                  <p className="actor-name">{item.enName}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <div className="cast__other-team"></div>
    </div>
  );
};

export default CastList;
