export interface IActorProfile {
  id: number;
  enName: string;
  name: string;
  photo: string;
  sex: string;
  growth: 0;
  birthday: string;
  death: string;
  age: number;
  birthPlace: IProffesion[];
  deathplace: [];
  spouses: ISpouses;
  countAwards: number;
  profession: IProffesion[];
  facts: [];
  movies: IAMovies[];
}
export interface IProffesion {
  value: string;
}
export interface IAMovies {
  id: number;
  name: string;
  alternativeName: string;
  rating: number;
  general: true;
  description: string;
  enProfession: string;
}
export interface ISpouses {
  id: number;
  name: string;
  divorced: true;
  divorcedReason: string;
  sex: string;
  children: number;
  relation: string;
}
