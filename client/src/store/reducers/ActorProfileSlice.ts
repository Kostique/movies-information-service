import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { IActorProfile } from '../../models/IActorProfile';
import { IErrorMessage } from '../../models/IErrorMessage';

interface ActorState {
  docs: IActorProfile;
  loading: boolean;
  error: IErrorMessage;
}

const clearError = {
  message: '',
  name: '',
  code: '',
};
const initialState: ActorState = {
  docs: {
    id: 0,
    enName: '',
    name: '',
    photo: '',
    sex: '',
    growth: 0,
    birthday: '',
    death: '',
    age: 0,
    birthPlace: [],
    deathplace: [],
    spouses: {
      id: 0,
      name: '',
      divorced: true,
      divorcedReason: '',
      sex: '',
      children: 0,
      relation: '',
    },
    countAwards: 0,
    profession: [],
    facts: [],
    movies: [],
  },
  loading: false,
  error: {
    message: '',
    name: '',
    code: '',
  },
};

export const ActorProfileSlice = createSlice({
  name: 'ActorProfilelSlice',
  initialState,
  reducers: {
    ActorProfileFetching(state) {
      state.loading = true;
    },
    ActorProfileSuccess(state, action: PayloadAction<IActorProfile>) {
      state.loading = false;
      state.docs = action.payload;
      state.error = clearError;
    },
    ActorProfileError(state, action: PayloadAction<IErrorMessage>) {
      state.error = action.payload;
    },
  },
});
export const { ActorProfileFetching, ActorProfileSuccess, ActorProfileError } =
  ActorProfileSlice.actions;
export default ActorProfileSlice.reducer;
