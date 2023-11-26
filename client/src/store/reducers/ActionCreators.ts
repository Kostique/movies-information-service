import axios from 'axios';
import { AppDispatch } from '../store';
import { moviesFetching, moviesFetchingError, moviesFetchingSuccess } from './MovieSlice';
import { itemFetching, itemFetchingError, itemFetchingSuccess } from './itemMovieSlice';
import { IMovie } from '../../models/IMovie';
import { IMovieItem } from '../../models/IMovieItem';
import { listFetching, listFetchingSuccess, listFetchingError } from './ListSlice';
import {
  collectionFetching,
  collectionFetchingSuccess,
  collectionFetchingError,
} from './CollectionSlice';
import {
  actorsBestError,
  actorsBestFetching,
  actorsBestFetchingSuccess,
  actorsInputError,
  actorsInputFetching,
  actorsInputFetchingSuccess,
  moviesBestError,
  moviesBestFetching,
  moviesBestFetchingSuccess,
  moviesInputError,
  moviesInputFetching,
  moviesInputFetchingSuccess,
} from './ActorsSlice';
import { IActors } from '../../models/IActor';
import { ActorProfileError, ActorProfileFetching, ActorProfileSuccess } from './ActorProfileSlice';
import { IActorProfile } from '../../models/IActorProfile';
import { IErrorMessage } from '../../models/IErrorMessage';

interface queryParams {
  year: string;
  country: string;
  genre: string;
  sort: string;
}

const token = 'WWTFB71-35W4AEG-PZYDHNM-XZQJ1HF';

export const fetchAllMovies =
  (
    type: string,
    page: number = 1,
    year?: string,
    country?: string,
    genre?: string,
    sort = 'votes.imdb',
  ) =>
  async (dispatch: AppDispatch) => {
    let queryParams: queryParams = {
      country: country ? `&search=${country}&field=countries.name` : '',
      year: year ? `&search=${year}&field=year` : '',
      genre: genre ? `&search=${genre.toLowerCase()}&field=genres.name` : '',
      sort: sort ? `&sortField=${sort}&sortType=-1` : '',
    };
    try {
      dispatch(moviesFetching());
      const response = await axios.get<IMovie>(
        `https://api.kinopoisk.dev/v1.3/movie?field=type&search=${type}${queryParams.genre}${queryParams.year}${queryParams.country}${queryParams.sort}`,
        {
          params: {
            token,
            page,
          },
        },
      );
      dispatch(moviesFetchingSuccess(response.data));
    } catch (e: any) {
      dispatch(moviesFetchingError(e));
    }
  };

export const fetchListMovies = (body: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(listFetching());
    const response = await axios.get<IMovie>(
      `https://api.kinopoisk.dev/v1.3/movie?field=name&search=${body}&sortField=votes.imbd&sortType=1`,
      {
        params: {
          token,
        },
      },
    );
    dispatch(listFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(listFetchingError(e));
  }
};

export const fetchItem = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(itemFetching());
    const response = await axios.get<IMovieItem>(
      `https://api.kinopoisk.dev/v1.3/movie?field=id&search=${id}&&selectFields=poster videos facts name alternativeName year description rating countries genres slogan productionCompanies premiere fees ageRating movieLength persons`,
      {
        params: {
          token: token,
        },
      },
    );

    dispatch(itemFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(itemFetchingError(e));
  }
};
export const fetchCollection = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(collectionFetching());
    const response = await axios.get<IMovieItem>(
      `https://api.kinopoisk.dev/v1.3/movie?field=year&search=2023 &search=Канада&field=countries.name&search=Франция&field=countries.name&search=Италия&field=countries.name&search=Германия&field=countries.name&search=Великобритания&field=countries.name&search=Испания&field=countries.name&search=США&field=countries.name&sortField=createdAt&sortType=-1&limit=5`,
      {
        params: {
          token: token,
        },
      },
    );
    dispatch(collectionFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(collectionFetchingError(e));
  }
};

export const fetchInputMovies = (body: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(moviesInputFetching());
    const response = await axios.get<IMovie>(
      `https://api.kinopoisk.dev/v1.3/movie?field=name&search=${body}&sortField=votes.imbd&sortType=1`,
      {
        params: {
          token,
        },
      },
    );
    dispatch(moviesInputFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(moviesInputError(e));
  }
};
export const fetchInputActors = (body: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(actorsInputFetching());
    const response = await axios.get<IActors>(
      `https://api.kinopoisk.dev/v1/person?sortField=countAwards&sortType=-1&name=${body}`,
      {
        params: {
          token,
        },
      },
    );
    dispatch(actorsInputFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(actorsInputError(e));
  }
};
export const fetchBestMovies = (page: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(moviesBestFetching());
    const response = await axios.get<IMovie>(
      `https://api.kinopoisk.dev/v1.3/movie?field=type&search=movie&sortField=votes.imdb&sortType=-1&page=${page}&field=year&search=2015-2023`,
      {
        params: {
          token,
        },
      },
    );
    dispatch(moviesBestFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(moviesBestError(e));
  }
};
export const fetchBestActors = (page: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(actorsBestFetching());
    const response = await axios.get<IActors>(
      `https://api.kinopoisk.dev/v1/person?page=${page}&sortField=countAwards&sortType=-1&field=age&search=18-45`,
      {
        params: {
          token,
        },
      },
    );
    dispatch(actorsBestFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(actorsBestError(e));
  }
};
export const fetchProfileActor = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(ActorProfileFetching());
    const response = await axios.get<IActorProfile>(`https://api.kinopoisk.dev/v1/person/${id}`, {
      params: {
        token,
      },
    });
    dispatch(ActorProfileSuccess(response.data));
  } catch (e: any) {
    dispatch(ActorProfileError(e));
  }
};
