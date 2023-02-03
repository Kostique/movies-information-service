import { StringLiteral } from "typescript";
import { IExternalId, ILogo, INames, IPoster, IRating } from "./IMovie";

export interface IMovieItem {
  ageRating: number;
  alternativeName: string;
  backdrop: any;
  budget: IBudget[];
  collections: ICollections[];
  countries: ICountries[];
  createDate: string;
  description: string;
  distributors: IDistributors[];
  enName: string;
  externalId: IExternalId[];
  facts: IFacts[];
  fees: IFees;
  genres: IGenres[];
  id: number;
  images: IImages[];
  imagesInfo: IImagesInfo[];
  lists: IList[];
  logo: ILogo[];
  movieLength: number;
  name: string;
  names: INames[];
  persons: IPersons[];
  poster: IPoster;
  premiere: IPremiere;
  productionCompanies: IProdCompan[];
  rating: IRating;
  ratingMpaa: string;
  seasonsInfo: ISeasonInf[];
  sequelsAndPrequels: ISequelAndPrequels[];
  shortDescription: string;
  similarMovies: ISimilarMovies[];
  slogan: string;
  spokenLanguages: ISpokLang[];
  technology: ITechgnology[];
  ticketsOnSale: boolean;
  type: string;
  typeNumber: number;
  updateDates: IUpdateDates[];
  updatedAt: string;
  videos: IVideos;
  votes: IVotes[];
  watchability: IWatchability[];
  year: number;
}
export interface IBudget {
  currency: string;
  value: number;
  _id: string;
}
export interface ICollections {}
export interface ICountries {
  name: string;
}
export interface IDistributors {
  distributor: string;
  distributorRelease: string;
}
export interface IFacts {
  value: string;
  type: string;
  spoiler: boolean;
}
export interface IFees {
  [key: string]: IBudget;
}

export interface IGenres {
  name: string;
}
export interface IImages {}
export interface IPersons {
  id: number;
  photo: string;
  name: string;
  enName: string;
  enProfession: string;
}
export interface IWatchability {}
export interface IUpdateDates {}
export interface IVideos {
  teasers: [];
  trailers: ITrailers[];
  _id: string;
}
export interface ITechgnology {}
export interface IVotes {}
export interface ISpokLang {}
export interface ISimilarMovies {}
export interface IImagesInfo {}
export interface IList {}
export interface IPremiere {
  [key: string]: string;
}
export interface ISeasonInf {}
export interface ISequelAndPrequels {}
export interface IProdCompan {
  name: string;
  url: string;
  previewUrl: string;
}

export interface ITrailers {
  url: string;
  name: string;
  site: string;
  type: string;
  _id: string;
}
