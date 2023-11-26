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

export const CollectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    collectionFetching(state) {
      state.isLoading = true;
    },
    collectionFetchingSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.movies = action.payload;
      state.error = {};
    },
    collectionFetchingError(state, action: PayloadAction<object>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  collectionFetching,
  collectionFetchingSuccess,
  collectionFetchingError,
} = CollectionSlice.actions;
export default CollectionSlice.reducer;
