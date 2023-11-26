import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FactsList from '../components/FactsList';
import { Spinner } from '../components/UI/Spinner';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { icon404 } from '../img/images';
import { fetchProfileActor } from '../store/reducers/ActionCreators';
import '../styles/componentStyles/ActorPage.scss';
import SVGSelector from '../svg/SvgSelector';
const ActorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { docs, loading, error } = useAppSelector((state) => state.ActorProfileReducer);
  useEffect(() => {
    dispatch(fetchProfileActor(id));
    window.scroll(1, 0);
  }, []);
  console.log(docs.movies);

  if (loading) {
    return (
      <div className="actor-profile" style={{ display: 'flex', justifyContent: 'center' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="actor-profile">
      <div className="actor-profile__container">
        <div className="actor-profile__photo">
          <button onClick={() => navigate(-1)} className="movie-item__btn-back">
            <SVGSelector id="btnBack" />
          </button>
          <img src={!!docs.photo.length ? docs.photo : icon404}></img>
        </div>
        <div className="actor-profile__description">
          <h4>{!!docs.enName ? docs.enName : docs.name}</h4>
          <button className="btn-favorite">
            Любимая звезда <SVGSelector id="heart" />
          </button>
          <div className="actor-profile__info">
            <h4>О персоне:</h4>
            <p>
              Карьера:{' '}
              <span>
                {docs.profession.map((item, i) => {
                  if (i + 1 < docs.profession.length) {
                    return item.value + ', ';
                  } else {
                    return item.value;
                  }
                })}
              </span>
            </p>
            <p>
              Пол: <span>{docs.sex || '-'}</span>
            </p>
            <p>
              Количество наград: <span>{docs.countAwards || '0'}</span>
            </p>
            <p>
              Рост: <span>{docs.growth ? docs.growth + ' см' : '-'}</span>
            </p>
            <p>
              Возраст: <span>{docs.age ? docs.age + ' лет' : '-'}</span>
            </p>
            <p>
              Дата рождения: <span>{!!docs.birthday ? docs.birthday.slice(0, 10) : '-'}</span>
            </p>
            <p>
              Место рождения:{' '}
              <span>
                {docs.birthPlace != undefined && !!docs.birthPlace.length
                  ? docs.birthPlace.map((item, i) => {
                      console.log('true');

                      if (i + 1 < docs.birthPlace.length) {
                        return item.value + ', ';
                      } else {
                        return item.value;
                      }
                    })
                  : ' -'}
              </span>
            </p>
            {!!docs.death && (
              <p>
                Дата смерти:
                <span> {docs.death.slice(0, 10)}</span>
              </p>
            )}
            {!!docs.facts.length && <FactsList facts={docs.facts} />}
          </div>
        </div>
      </div>

      <div className="actor-profile__movies">
        <h5>Все фильмы с участием {docs.enName}</h5>
        <div>
          {docs.movies
            .filter((item) => item.rating)
            .map((item) => {
              return (
                <div
                  className="item"
                  key={item.id}
                  onClick={() => navigate(`/movie-item/${item.id}`)}>
                  <div className="item__desc">
                    <h4>{item.alternativeName}</h4>
                    <span>{item.description}</span>
                  </div>
                  <div className="item__rating">
                    <span className={item.rating > 5 ? 'green' : 'gray'}>
                      {item.rating.toFixed(1) || '-'}
                    </span>
                    <button className="btn-favorite" onClick={() => console.log('favorite')}>
                      Буду смотреть <SVGSelector id="favorite" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ActorPage;
