import "../styles/componentStyles/siteHistory.scss";
import "../styles/componentStyles/MainCollection.scss";
import { SiteHistory } from "../components/SiteHistory";
import { useNavigate } from "react-router-dom";
const imgBlocks = [
  { class: "first-img", text: "Детские", sum: 36, id: 1, param: "Детский" },
  { class: "second-img", text: "Драмы", sum: 40022, id: 2, param: "Драма" },
  { class: "third-img", text: "Комедии", sum: 23410, id: 3, param: "Комедия" },
  {
    class: "fourth-img",
    text: "Криминалы",
    sum: 4922,
    id: 4,
    param: "Криминал",
  },
  {
    class: "fifth-img",
    text: "Мелодрамы",
    sum: 8986,
    id: 5,
    param: "Мелодрама",
  },
  { class: "sixth-img", text: "Триллеры", sum: 10349, id: 6, param: "Триллер" },
  { class: "seventh-img", text: "Ужасы", sum: 7694, id: 7, param: "Ужасы" },
  {
    class: "eighth-img",
    text: "Фантастика",
    sum: 4232,
    id: 8,
    param: "Фантастика",
  },
  { class: "ninth-img", text: "Фэнтези", sum: 3975, id: 9, param: "Фэнтези" },
];

export const MainCollection = () => {
  const navigate = useNavigate();
  return (
    <main className="home">
      <div
        className="home__first-block"
        onClick={() =>
          navigate(
            "/movie-list/movie?page=1&sort=votes.imdb&genre=Боевик&year=2010-2014"
          )
        }
      >
        <div className="text-centr">
          <h3>Боевики</h3>
          <p>
            Подборок: <span className="blue">6629</span>
          </p>
        </div>
      </div>

      <div className="home__second-block">
        <div
          className="first-img img-size"
          onClick={() =>
            navigate(
              "/movie-list/movie?page=1&sort=votes.imdb&genre=Военный&year=2010-2014"
            )
          }
        >
          <div className="text-centr">
            <h3>Военные</h3>
            <p>
              Подборок: <span className="blue">1489</span>
            </p>
          </div>
        </div>

        <div
          className="second-img img-size"
          onClick={() =>
            navigate(
              "/movie-list/movie?page=1&sort=votes.imdb&genre=Детектив&year=2010-2014"
            )
          }
        >
          <div className="text-centr">
            <h3>Детективы</h3>
            <p>
              Подборок: <span className="blue">4192</span>
            </p>
          </div>
        </div>
      </div>

      <div className="home__third-block">
        {imgBlocks.map((elem) => {
          return (
            <div
              key={elem.id}
              className={elem.class + " size-img"}
              onClick={() =>
                navigate(
                  `/movie-list/movie?page=1&sort=votes.imdb&genre=${elem.param}&year=2010-2014`
                )
              }
            >
              <div className="text-centr">
                <h3>{elem.text}</h3>
                <p>
                  Подборок: <span className="blue">{elem.sum}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <SiteHistory />
    </main>
  );
};
