import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { icon404 } from '../img/images';
import '../styles/componentStyles/UserProfile.scss';
import SVGSelector from '../svg/SvgSelector';

export const UserProfile = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get('/api')
  //     .then((response) => {
  //       // @ts-ignore
  //       if (response) {
  //         // @ts-ignore
  //         return response.data;
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch('upload_file', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Erorr');
      });
  };

  return (
    <div className="user-profile">
      <div className="user-profile__container">
        <div className="user-profile__header">
          <button onClick={() => navigate(-1)} className="movie-item__btn-back">
            <SVGSelector id="btnBack" />
          </button>
          <div>
            <span>Мой профиль</span>
            <span>Любимые актеры</span>
            <span>Избранное</span>
            <span>Настройки</span>
          </div>
        </div>
        <div className="user-profile__main">
          <div className="user-info">
            <img src={icon404} alt="userPhoto" className="user-photo" />
            <h4 className="user-name">Имя Фамилия</h4>
            <form encType="multipart/form-data" onSubmit={handleSubmitForm}>
              <div>
                <label htmlFor="formFile">Upload your file</label>
                <input type="file" name="file" id="formFile" />
              </div>
              <button type="submit">submit</button>
            </form>
          </div>
          <div className="user-profile__panel">
            <p>
              Дата рождения:<span>00.00.0000</span>
            </p>
            <p>
              Дата регистрации:<span>00.00.0000</span>
            </p>
            <p>
              Страна:<span>00.00.0000</span>
            </p>
            <p>
              Количество оценок:<span>00.00.0000</span>
            </p>
            <p>
              Количество коментариев:<span>00.00.0000</span>
            </p>
            <p>
              Подписчиков:<span>00.00.0000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
