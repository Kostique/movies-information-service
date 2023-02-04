import axios from "axios";
import { AppDispatch } from "../store";
import {
  moviesFetching,
  moviesFetchingError,
  moviesFetchingSuccess,
} from "./MovieSlice";
import {
  itemFetching,
  itemFetchingError,
  itemFetchingSuccess,
} from "./itemMovieSlice";
import { IMovie } from "../../models/IMovie";
import { IMovieItem } from "../../models/IMovieItem";
import {
  listFetching,
  listFetchingSuccess,
  listFetchingError,
} from "./ListSlice";
import { collectionFetching, collectionFetchingSuccess, collectionFetchingError } from "./CollectionSlice";

interface queryParams {
  year: string;
  country: string;
  genre: string;
  sort: string;
}

const token = "TTNFQ2V-20D4M7F-JCXT6Z6-372YC87";

export const fetchAllMovies =
  (
    type: string,
    page: number = 1,
    year?: string,
    country?: string,
    genre?: string,
    sort = "votes.imdb"
  ) =>
  async (dispatch: AppDispatch) => {
    let queryParams: queryParams = {
      country: country ? `&search=${country}&field=countries.name` : "",
      year: year ? `&search=${year}&field=year` : "",
      genre: genre ? `&search=${genre.toLowerCase()}&field=genres.name` : "",
      sort: sort ? `&sortField=${sort}&sortType=-1` : "",
    };
    try {
      dispatch(moviesFetching());
      const response = await axios.get<IMovie>(
        `https://api.kinopoisk.dev/movie?field=type&search=${type}${queryParams.genre}${queryParams.year}${queryParams.country}${queryParams.sort}`,
        {
          params: {
            token,
            page,
          },
        }
      );
      dispatch(moviesFetchingSuccess(response.data));
    } catch (e: any) {
      dispatch(moviesFetchingError(e));
    }
  };

export const fetchListMovies =
  (body: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(listFetching());
      const response = await axios.get<IMovie>(
        `https://api.kinopoisk.dev/movie?field=name&search=${body}&sortField=votes.imbd&sortType=1`,
        {
          params: {
            token,
          },
        }
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
      `https://api.kinopoisk.dev/movie?field=id&search=${id}`,
      {
        params: {
          token: token,
        },
      }
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
      `https://api.kinopoisk.dev/movie?field=year&search=2023&sortField=createdAt&sortType=-1&limit=5`,
      {
        params: {
          token: token,
        },
      }
    );
    dispatch(collectionFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(collectionFetchingError(e));
  }
};