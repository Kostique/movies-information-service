import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "./MovieSlice";

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

export const ListSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    listFetching(state) {
      state.isLoading = true;
    },
    listFetchingSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.movies = action.payload;
      state.error = {};
    },
    listFetchingError(state, action: PayloadAction<object>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    listCleaner(state) {
      state.movies = {
        docs: [],
        limit: 0,
        page: 0,
        pages: 0,
        total: 0,
      };
    },
  },
});

export const {
  listFetching,
  listFetchingSuccess,
  listFetchingError,
  listCleaner,
} = ListSlice.actions;
export default ListSlice.reducer;
