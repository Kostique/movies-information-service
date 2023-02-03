export interface IMovie {
  docs: IDocs[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface IDocs {
  alternativeName: string | null;
  description: string | null;
  enName: string | null;
  externalId: IExternalId[];
  id: number;
  logo: ILogo[] | null;
  movieLength: number | null;
  name: string;
  names: INames[] | null;
  poster: IPoster;
  rating: IRating;
  shortDescription: string | null;
  type: string | null;
  votes: IRating;
  year: number | null;
}

export interface IExternalId {
  id: string | null;
  imdb: string | null;
}
export interface ILogo {
  _id: string | null;
  url: string | null;
}
export interface INames {
  _id: string | null;
  name: string | null;
}
export interface IPoster {
  previewUrl: string;
  url: string;
  _id: string;
}
export interface IRating {
  await: number | null;
  filmCritics: number | null;
  imdb: number;
  kp: number;
  russianFilmCritics: number | null;
  _id: string | null;
}
