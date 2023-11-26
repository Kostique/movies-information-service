import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../components/UI/Spinner';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchItem } from '../store/reducers/ActionCreators';
import '../styles/componentStyles/MovieItem.scss';
import SVGSelector from '../svg/SvgSelector';
import { icon404 } from '../img/images';
import FactsList from '../components/FactsList';
import { ActorCollection } from '../components/ActorCollection';
import { castNameUpdate } from '../store/reducers/CastSlice';

export const MovieItem = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { item, isLoading, error } = useAppSelector((state) => state.itemReducer);
  useEffect(() => {
    dispatch(fetchItem(id));

    window.scroll(1, 0);
  }, [id]);
  if (error) {
    return <div>ERROR</div>;
  }
  return (
    <>
      <div style={{ fontSize: '300px' }}>{}</div>
      {isLoading ? (
        <div className="movie-item" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Spinner />
        </div>
      ) : (
        <div className="movie-item">
          <button onClick={() => navigate(-1)} className="movie-item__btn-back">
            <SVGSelector id="btnBack" />
          </button>
          <div className="movie-item__main-container">
            <div className="movie-item__preview">
              <div className="preview-poster">
                <img
                  src={item.docs[0]?.poster != null ? item.docs[0]?.poster.url : icon404}
                  alt="poster"></img>
              </div>
              {!!item.docs[0].videos && !!item.docs[0].videos.trailers.length && (
                <ReactPlayer
                  url={item.docs[0].videos.trailers[0].url}
                  height="300px"
                  width="420px"
                  controls
                />
              )}
            </div>

            <div className="movie-item__content">
              <div className="movie-item__caption">
                <h4>{item.docs[0].name}</h4>
                <p>{item.docs[0].alternativeName}</p>
              </div>
              <span className="movie-item__rating">
                <SVGSelector id="rating" rating={item.docs[0].rating.imdb * 10 + '%'} />
              </span>
              <div className="movie-item__info">
                <h4>О фильме</h4>
                {item.docs[0].description}
                <p>
                  Год производства:
                  <span>{item.docs[0].year ? ` ${item.docs[0].year}` : ' -'}</span>
                </p>
                <p>
                  Страна:
                  <span>
                    {item.docs[0].countries
                      ? item.docs[0].countries.map((el, i) =>
                          i < item.docs[0].countries.length - 1 ? ` ${el.name}, ` : ` ${el.name}`,
                        )
                      : ' -'}
                  </span>
                </p>
                <p>
                  Жанр:
                  <span>
                    {item.docs[0].genres
                      ? item.docs[0].genres.map((el, i) =>
                          i < item.docs[0].genres.length - 1 ? ` ${el.name},` : ` ${el.name}`,
                        )
                      : ' -'}
                  </span>
                </p>
                <p>
                  Слоган: <span>{item.docs[0].slogan ? item.docs[0].slogan : ' -'}</span>
                </p>
                <p>
                  Продакшн:
                  <span>
                    {item.docs[0].productionCompanies
                      ? item.docs[0].productionCompanies.map((el, i) =>
                          i < item.docs[0].productionCompanies.length - 1
                            ? ` ${el.name}, `
                            : ` ${el.name}`,
                        )
                      : ' -'}
                  </span>
                </p>
                <p>
                  Премьера в мире:
                  <span>
                    {item.docs[0].premiere && item.docs[0].premiere.world
                      ? ` ${item.docs[0].premiere.world.slice(0, 10)}`
                      : ' -'}
                  </span>
                </p>
                <p>
                  Сборы в мире:
                  <span>
                    {item.docs[0].fees.world && item.docs[0].fees.world.value
                      ? ` ${new Intl.NumberFormat().format(item.docs[0].fees.world.value)}` + '$'
                      : ' -'}
                  </span>
                </p>
                <p>
                  Возраст:
                  <span>{item.docs[0].ageRating ? ` ${item.docs[0].ageRating}` + '+' : ' -'}</span>
                </p>
                <p>
                  Длительность:
                  <span>
                    {item.docs[0].movieLength ? ` ${item.docs[0].movieLength} мин.` : ' -'}
                  </span>
                </p>
              </div>
              {!!item.docs[0].facts.length && <FactsList facts={item.docs[0].facts} />}
              {!!item.docs[0].persons.length && (
                <ActorCollection
                  actors={item.docs[0].persons}
                  id={item.docs[0].id}
                  name={item.docs[0].alternativeName || item.docs[0].name}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
