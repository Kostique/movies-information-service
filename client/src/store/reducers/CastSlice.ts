import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPersons } from '../../models/IMovieItem';

interface IIPerson {
  items: IPersons[];
  name: string;
}

const actors: IIPerson = {
  items: [],
  name: '',
};

export const CastSlice = createSlice({
  name: 'CastReducer',
  initialState: actors,
  reducers: {
    castItemsUpdate(state, action: PayloadAction<IPersons[]>) {
      state.items = action.payload;
    },
    castNameUpdate(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { castItemsUpdate, castNameUpdate } = CastSlice.actions;
export default CastSlice.reducer;
