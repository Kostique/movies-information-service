import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovieItem } from "../../models/IMovieItem";

interface itemMovie {
  item: IMovieItem;
  isLoading: boolean;
  error: string;
}

const initialState: itemMovie = {
  item: {
    ageRating: 0,
    alternativeName: "",
    backdrop: 0,
    budget: [],
    collections: [],
    countries: [],
    createDate: "",
    description: "",
    distributors: [],
    enName: "",
    externalId: [],
    facts: [],
    fees: {},
    genres: [],
    id: 0,
    images: [],
    imagesInfo: [],
    lists: [],
    logo: [],
    movieLength: 0,
    name: "",
    names: [],
    persons: [],
    poster: {
      previewUrl: "",
      url: "",
      _id: "",
    },
    premiere: {},
    productionCompanies: [],
    rating: {
      await: null,
      filmCritics: null,
      imdb: 0,
      kp: 0,
      russianFilmCritics: null,
      _id: null,
    },
    ratingMpaa: "",
    seasonsInfo: [],
    sequelsAndPrequels: [],
    shortDescription: "",
    similarMovies: [],
    slogan: "",
    spokenLanguages: [],
    technology: [],
    ticketsOnSale: false,
    type: "",
    typeNumber: 0,
    updateDates: [],
    updatedAt: "",
    videos: {
      teasers: [],
      trailers: [],
      _id: "",
    },
    votes: [],
    watchability: [],
    year: 0,
  },
  isLoading: false,
  error: "",
};

export const itemSlice = createSlice({
  name: "itemMovie",
  initialState,
  reducers: {
    itemFetching(state) {
      state.isLoading = true;
    },
    itemFetchingSuccess(state, action: PayloadAction<any>) {
      state.item = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    itemFetchingError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
export const { itemFetching, itemFetchingSuccess, itemFetchingError } =
  itemSlice.actions;
export default itemSlice.reducer;
