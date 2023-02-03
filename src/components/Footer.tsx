import SVGSelector from "../svg/SvgSelector";
import "../styles/componentStyles/Footer.scss";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__content-logo">
          <SVGSelector id="svgLogo" />
        </div>
        <div>
          <h2 className="footer__content caption">Меню</h2>
          <ul className="footer__content-menu">
            <li className="menu-item">
              <Link to={"/collection"}>Подбороки</Link>
            </li>
            <li className="menu-item">
              <Link to={`/movie-list/movie?page=1&sort=votes.imdb`}>
                Фильмы
              </Link>
            </li>
            <li className="menu-item">
              <Link to={`/movie-list/tv-series?page=1&sort=votes.imdb`}>
                Сериалы
              </Link>
            </li>
            <li className="menu-item">
              <Link to={`/movie-list/cartoon?page=1&sort=votes.imdb`}>
                Мультфильмы
              </Link>
            </li>
            <li className="menu-item">
              <Link to={`/movie-list/anime?page=1&sort=votes.imdb`}>Аниме</Link>
            </li>
            <li className="menu-item">
              <Link to={"/actors"}>Актеры</Link>
            </li>
          </ul>
        </div>
        <div className="footer__content-descr">
          <h3 className="footer__content-descr caption">О нас</h3>
          <p className="footer__content-descr descr-text">
            Зная всё о кино, хочется поделиться этим с другими. Делитесь
            фильмами, трейлерами, персонами и новостями в социальных сетях,
            присваивайте рейтинги фильмам и обсуждайте их с друзьями и
            подписчиками!
          </p>
          <br />
          <p className="footer__content-descr descr-text">
            Интересные фильмы, ближайшие кинотеатры и любимых актеров можно
            добавлять в «Избранное». Система покажет все связанные с ними
            новости и новые трейлеры, подскажет, когда можно купить билет в кино
            на интересующую премьеру. Присоединяйтесь!
          </p>
        </div>
      </div>
      <div className="footer__links">
        <p className="footer__links-text">
          ©Все права защищены MovieDB.ru 2021
        </p>
        <div className="footer__links-icons">
          <SVGSelector id={"iconFacebook"} />

          <SVGSelector id={"iconInsta"} />

          <SVGSelector id={"iconVK"} />
        </div>
        <p className="footer__links-text">
          <a href="#">Политика конфиденциальности</a>
        </p>
      </div>
    </div>
  );
};
