import { combineReducers, configureStore } from '@reduxjs/toolkit';
import MovieReducer from './reducers/MovieSlice';
import itemReducer from './reducers/itemMovieSlice';
import FilterReducer from './reducers/FilterSlice';
import ListReducer from './reducers/ListSlice';
import CollectionReducer from './reducers/CollectionSlice';

import ActorsReducer from './reducers/ActorsSlice';
import ActorProfileReducer from './reducers/ActorProfileSlice';
import CastReducer from './reducers/CastSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, CastReducer);

export const rootReducer = combineReducers({
  ListReducer,
  MovieReducer,
  itemReducer,
  FilterReducer,
  CollectionReducer,
  ActorsReducer,
  ActorProfileReducer,
  persistedReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type Appstore = ReturnType<typeof setupStore>;
export type AppDispatch = Appstore['dispatch'];
