import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyInput from '../components/UI/MyInput';
import { Spinner } from '../components/UI/Spinner';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { buttonMore, icon404 } from '../img/images';
import {
  fetchBestActors,
  fetchBestMovies,
  fetchInputActors,
  fetchInputMovies,
  fetchListMovies,
} from '../store/reducers/ActionCreators';
import { actorsInputCleaner, moviesInputCleaner } from '../store/reducers/ActorsSlice';
import { listCleaner } from '../store/reducers/ListSlice';
import '../styles/componentStyles/ActorList.scss';

const ActorList = () => {
  const {
    actors,
    actorsError,
    actorsLoading,
    actorsInput,
    actorsInputError,
    actorsInputLoading,
    movies,
    moviesError,
    moviesLoading,
    moviesInput,
    moviesInputError,
    moviesInputLoading,
  } = useAppSelector((store) => store.ActorsReducer);

  console.log(actors);

  const [inputName, setInputName] = useState<string>('');
  const [empty, setEmpty] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [load, setLoad] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (firstRender && actors.page < 1 && movies.page < 1) {
      dispatch(fetchBestActors(1));
      dispatch(fetchBestMovies(1));
      setFirstRender(false);
    }
    if (load === 'actors') {
      dispatch(fetchBestActors(actors.page + 1));
      setLoad('');
    }
    if (load === 'movies') {
      dispatch(fetchBestMovies(movies.page + 1));
      setLoad('');
    }
  }, [load]);

  useEffect(() => {
    if (inputName.length > 0) {
      dispatch(fetchInputMovies(inputName));
      dispatch(fetchInputActors(inputName));
    } else {
      dispatch(actorsInputCleaner());
      dispatch(moviesInputCleaner());
    }
  }, [inputName]);
  useEffect(() => {
    if (inputName && actorsInput.docs.length < 1 && moviesInput.docs.length < 1) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [actorsInput, moviesInput]);
  return (
    <div className="actors-list">
      <div className="actors-list__input" style={{ zIndex: '1' }}>
        <MyInput placeholder="Поиск актеров и кино..." onSearch={setInputName} />
        {empty && (
          <div className="input-list empty">
            К сожалению, по вашему запросу ничего не найдено...
          </div>
        )}
        {(!!actorsInput.docs.length || !!moviesInput.docs.length) && (
          <ul className="input-list">
            <h4 className="input-section">Персоны:</h4>
            {actorsInputLoading && <Spinner />}
            {!!actorsInput.docs.length &&
              actorsInput.docs.map((item) => (
                <Link to={`/actor-item/${item.id}`} key={item.id}>
                  <div className="item-actor">
                    <div className="item-icon">
                      <img src={item.photo ? item.photo : icon404}></img>
                    </div>
                    <div className="item-info">
                      {item.name}
                      <span>
                        {item.enName}
                        {item.enName && item.age > 1 && ', ' + (2022 - item.age)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            <h4 className="input-section">Фильмы:</h4>
            {moviesInputLoading && <Spinner />}
            {!!moviesInput.docs.length &&
              moviesInput.docs.map((item, index) => (
                <Link
                  to={`/cast-list/${item.id}`}
                  key={index}
                  className="input-item"
                  onClick={() => {
                    dispatch(listCleaner());
                    setInputName('');
                  }}>
                  <div className="item-movie">
                    <span className="item-icon">
                      <img
                        src={
                          item.poster != null && item.poster.previewUrl.length > 10
                            ? item.poster.previewUrl
                            : icon404
                        }></img>
                    </span>
                    <div className="item-name">
                      <p>{item.name ? item.name : item.alternativeName}</p>
                      <span>{item.alternativeName && item.alternativeName}</span>
                    </div>
                  </div>
                  <span className="item-rating">{item.rating.imdb ? item.rating.imdb : ''}</span>
                </Link>
              ))}
          </ul>
        )}
      </div>
      <div className="actors-list__popular-collection">
        <h4 className="popular-actors__caption">Популярные персоны:</h4>
        <div className="popular-actors__list">
          {!!actors.docs.length &&
            actors.docs.map((item, i) => (
              <Link to={`/actor-item/${item.id}`} key={i} className="item">
                <div className="item-photo">
                  <img src={item.photo ? item.photo : icon404}></img>
                </div>
                <a className="item-name">{item.name || item.enName}</a>
              </Link>
            ))}
          {actorsLoading ? (
            <div style={{}}>
              <Spinner width="150px" height="200px" />
            </div>
          ) : (
            <div onClick={() => setLoad('actors')}>
              <img src={buttonMore} className="img-more" alt="loadMore"></img>
              <span className="onMouse-text">Загрузить еще...</span>
            </div>
          )}
        </div>
      </div>
      <div className="actors-list__popular-collection">
        <h4 className="popular-actors__caption">Популярные фильмы:</h4>
        <div className="popular-actors__list">
          {!!movies.docs.length &&
            movies.docs.map((item, i) => (
              <Link to={`/movie-item/${item.id}`} key={i} className="item">
                <div className="item-photo">
                  <img src={item.poster.url ? item.poster.url : icon404}></img>
                </div>
                <a className="item-name">{item.name || item.enName}</a>
              </Link>
            ))}
          {moviesLoading ? (
            <div style={{}}>
              <Spinner width="150px" height="200px" />
            </div>
          ) : (
            <div onClick={() => setLoad('movies')}>
              <img src={buttonMore} className="img-more" alt="loadMore"></img>
              <span className="onMouse-text">Загрузить еще...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActorList;
