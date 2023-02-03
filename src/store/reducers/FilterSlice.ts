import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Filters {
  genre: string;
  country: string;
  year: string;
  sort: string;
}
const initialState: Filters = {
  genre: "",
  country: "",
  year: "",
  sort: "",
};
export const FilterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeGenre(state, { payload }: PayloadAction<string>) {
      state.genre = payload;
    },
    changeCountry(state, { payload }: PayloadAction<string>) {
      state.country = payload;
    },
    changeYear(state, { payload }: PayloadAction<string>) {
      state.year = payload;
    },
    changeSort(state, { payload }: PayloadAction<string>) {
      state.sort = payload;
    },
  },
});

export const { changeGenre, changeCountry, changeYear, changeSort } =
  FilterSlice.actions;
export default FilterSlice.reducer;
