import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IErrorMessage } from "../../models/IErrorMessage";
import { IMovie } from "../../models/IMovie";

export interface Movie {
  movies: IMovie;
  isLoading: boolean;
  error: IErrorMessage;
}

const initialState: Movie = {
  movies: {
    docs: [],
    limit: 0,
    page: 0,
    pages: 0,
    total: 0,
  },
  isLoading: false,
  error: {},
};

export const MovieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    moviesFetching(state) {
      state.isLoading = true;
    },
    moviesFetchingSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.movies = action.payload;
      state.error = {};
    },
    moviesFetchingError(state, action: PayloadAction<object>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { moviesFetching, moviesFetchingSuccess, moviesFetchingError } =
  MovieSlice.actions;
export default MovieSlice.reducer;
