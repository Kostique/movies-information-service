import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieItem } from '../../models/IMovieItem';

interface itemMovie {
  item: IMovieItem;
  isLoading: boolean;
  error: string;
}

const initialState: itemMovie = {
  item: {
    docs: [],
    limit: 10,
    page: 1,
    pages: 0,
    total: 0,
  },
  isLoading: true,
  error: '',
};

export const itemSlice = createSlice({
  name: 'itemMovie',
  initialState,
  reducers: {
    itemFetching(state) {
      state.isLoading = true;
    },
    itemFetchingSuccess(state, action: PayloadAction<IMovieItem>) {
      state.item = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    itemFetchingError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
export const { itemFetching, itemFetchingSuccess, itemFetchingError } = itemSlice.actions;
export default itemSlice.reducer;
