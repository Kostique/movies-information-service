import { combineReducers, configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./reducers/MovieSlice";
import itemReducer from "./reducers/itemMovieSlice";
import FilterReducer from "./reducers/FilterSlice";
import ListReducer from "./reducers/ListSlice";
import CollectionReducer from "./reducers/CollectionSlice"
export const rootReducer = combineReducers({
  ListReducer,
  MovieReducer,
  itemReducer,
  FilterReducer,
  CollectionReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type Appstore = ReturnType<typeof setupStore>;
export type AppDispatch = Appstore["dispatch"];
