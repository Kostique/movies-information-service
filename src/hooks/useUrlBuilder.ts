import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  changeCountry,
  changeGenre,
  changeSort,
  changeYear,
} from "../store/reducers/FilterSlice";
import { useAppDispatch, useAppSelector } from "./redux";

export const useUrlBuilder = () => {
  const [searchParams] = useSearchParams();
  const { country, year, genre, sort } = useAppSelector(
    (store) => store.FilterReducer
  );
  const dispatch = useAppDispatch();
  const genreOld: string = searchParams.get("genre") || "";
  const yearOld: string = searchParams.get("year") || "";
  const countryOld: string = searchParams.get("country") || "";
  const sortOld: string = searchParams.get("sort") || "";
  useEffect(() => {
    dispatch(changeSort(sortOld));
    dispatch(changeCountry(countryOld));
    dispatch(changeYear(yearOld));
    dispatch(changeGenre(genreOld));
  }, []);

  const genreFilter = genre && `&genre=${genre}`;
  const countryFilter = country && `&country=${country}`;
  const yearFilter = year && `&year=${year}`;
  const sortFilter = sort && `&sort=${sort}`;
  const queryParams = `${genreFilter}${countryFilter}${yearFilter}${sortFilter}`;
  const oldQueryParams = `&genre=${genreOld}&country=${countryOld}&year=${yearOld}&sort=${sortOld}`;
  return {
    countryOld,
    sortOld,
    yearOld,
    genreOld,
    queryParams,
    oldQueryParams,
  };
};
