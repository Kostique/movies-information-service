import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActors } from "../../models/IActor";
import { IMovie } from "../../models/IMovie";

interface IActorsState {
  actorsInput: IActors;
  moviesInput: IMovie;
  actors: IActors;
  movies: IMovie;
  actorsInputLoading: boolean;
  moviesInputLoading: boolean;
  actorsLoading: boolean;
  moviesLoading: boolean;
  actorsInputError: string;
  moviesInputError: string;
  actorsError: string;
  moviesError: string;
}

const initialState: IActorsState = {
  actorsInput: {
    docs: [],
    limit: 0,
    page: 0,
    pages: 0,
    total: 0,
  },
  moviesInput: {
    docs: [],
    limit: 0,
    page: 0,
    pages: 0,
    total: 0,
  },
  actors: {
    docs: [],
    limit: 0,
    page: 0,
    pages: 0,
    total: 0,
  },
  movies: {
    docs: [],
    limit: 0,
    page: 0,
    pages: 0,
    total: 0,
  },
  actorsInputLoading: false,
  moviesInputLoading: false,
  actorsLoading: false,
  moviesLoading: false,
  actorsInputError: "",
  moviesInputError: "",
  actorsError: "",
  moviesError: "",
};

export const ActorsSlice = createSlice({
  name: "ActorPage",
  initialState,
  reducers: {
    actorsInputFetching(state) {
      state.actorsInputLoading = true;
    },
    actorsInputFetchingSuccess(state, action: PayloadAction<IActors>) {
      state.actorsInput = action.payload;
      state.actorsInputError = "";
      state.actorsInputLoading = false;
    },
    actorsInputError(state, action: PayloadAction<string>) {
      state.actorsInputError = action.payload;
      state.actorsInputLoading = false;
    },
    actorsInputCleaner(state){
      state.actorsInput ={
        docs: [],
        limit: 0,
        page: 0,
        pages: 0,
        total: 0,
      }
    },
    moviesInputFetching(state) {
      state.moviesInputLoading = true;
    },
    moviesInputFetchingSuccess(state, action: PayloadAction<IMovie>) {
      state.moviesInput = action.payload;
      state.moviesInputError = "";
      state.moviesInputLoading = false;
    },
    moviesInputError(state, action: PayloadAction<string>) {
      state.moviesInputError = action.payload;
      state.moviesInputLoading = false;
    },
    moviesInputCleaner(state){
      state.moviesInput ={
        docs: [],
        limit: 0,
        page: 0,
        pages: 0,
        total: 0,
      }
    },
    actorsBestFetching(state) {
      state.actorsLoading = true;
    },
    actorsBestFetchingSuccess(state, action: PayloadAction<IActors>) {
      state.actors = {...action.payload, docs: [...state.actors.docs, ...action.payload.docs] }
      state.actorsError = "";
      state.actorsLoading = false;
    },
    actorsBestError(state, action: PayloadAction<string>) {
      state.actorsError = action.payload;
      state.actorsLoading = false;
    },
    moviesBestFetching(state) {
      state.moviesLoading = true;
    },
    moviesBestFetchingSuccess(state, action: PayloadAction<IMovie>) {
      state.movies = {...action.payload, docs: [...state.movies.docs, ...action.payload.docs] }
      state.moviesError = "";
      state.moviesLoading = false;
    },
    moviesBestError(state, action: PayloadAction<string>) {
      state.moviesError = action.payload;
      state.moviesLoading = false;
    },
  },
});
export const {
  actorsInputFetching,
  actorsInputFetchingSuccess,
  actorsInputError,
  moviesBestError,
  moviesBestFetching,
  moviesBestFetchingSuccess,
  moviesInputError,
  moviesInputFetching,
  moviesInputFetchingSuccess,
  actorsBestError,
  actorsBestFetching,
  actorsBestFetchingSuccess,
  actorsInputCleaner,
  moviesInputCleaner
} = ActorsSlice.actions;
export default ActorsSlice.reducer;
