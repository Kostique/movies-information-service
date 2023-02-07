import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../components/UI/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchItem } from "../store/reducers/ActionCreators";
import "../styles/componentStyles/MovieItem.scss";
import SVGSelector from "../svg/SvgSelector";
import { icon404 } from "../img/images";
import FactsList from "../components/FactsList";
import { ActorList } from "../components/ActorList";

export const MovieItem = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { item, isLoading, error } = useAppSelector(
    (state) => state.itemReducer
  );
  useEffect(() => {
    dispatch(fetchItem(id));
    window.scroll(1, 0);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div
          className="movie-item"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
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
                  src={item?.poster != null ? item?.poster.url : icon404}
                  alt="poster"
                ></img>
              </div>
              {item.videos.trailers.length > 0 && (
                <ReactPlayer
                  url={item?.videos.trailers[0].url}
                  height="300px"
                  width="420px"
                  controls
                />
              )}

              {item.facts &&
                item.facts.length > 1 &&
                item.persons.length > 1 && <ActorList actors={item.persons} />}
            </div>

            <div className="movie-item__content">
              <div className="movie-item__caption">
                <h4>{item.name}</h4>
                <p>{item.alternativeName}</p>
              </div>
              <span className="movie-item__rating">
                <SVGSelector id="rating" rating={item.rating.imdb * 10 + "%"} />
              </span>
              <div className="movie-item__info">
                <h4>О фильме</h4>
                {item.description}
                <p>
                  Год производства:
                  <span>{item.year ? ` ${item.year}` : " -"}</span>
                </p>
                <p>
                  Страна:
                  <span>
                    {item.countries
                      ? item.countries.map((el, i) =>
                          i < item.countries.length - 1
                            ? ` ${el.name}, `
                            : ` ${el.name}`
                        )
                      : " -"}
                  </span>
                </p>
                <p>
                  Жанр:
                  <span>
                    {item.genres
                      ? item.genres.map((el, i) =>
                          i < item.genres.length - 1 ? ` ${el.name}, ` : el.name
                        )
                      : " -"}
                  </span>
                </p>
                <p>
                  Слоган: <span>{item.slogan ? item.slogan : " -"}</span>
                </p>
                <p>
                  Продакшн:
                  <span>
                    {item.productionCompanies
                      ? item.productionCompanies.map((el, i) =>
                          i < item.productionCompanies.length - 1
                            ? ` ${el.name}, `
                            : ` ${el.name}`
                        )
                      : " -"}
                  </span>
                </p>
                <p>
                  Премьера в мире:
                  <span>
                    {item.premiere && item.premiere.world
                      ? ` ${item.premiere.world.slice(0, 10)}`
                      : " -"}
                  </span>
                </p>
                <p>
                  Сборы в мире:
                  <span>
                    {item.fees.world && item.fees.world.value
                      ? ` ${new Intl.NumberFormat().format(
                          item.fees.world.value
                        )}` + "$"
                      : " -"}
                  </span>
                </p>
                <p>
                  Возраст:
                  <span>
                    {item.ageRating ? ` ${item.ageRating}` + "+" : " -"}
                  </span>
                </p>
                <p>
                  Длительность:
                  <span>
                    {item.movieLength ? ` ${item.movieLength} мин.` : " -"}
                  </span>
                </p>
              </div>
              {item.facts && item.facts.length > 1 && (
                <FactsList facts={item.facts} />
              )}
              {(item.facts && item.facts.length > 1) || (
                <ActorList actors={item.persons} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
