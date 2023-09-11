import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';

export interface Profile {
  mobileNo: string;
  firstName: string;
  lastName: string;
  password: string;
  password_confirmation: string;
  country: String;
}
export interface signUpProfileType {
  profile: Profile;
}

export const initialState: signUpProfileType = {
  profile: {
    mobileNo: '',
    firstName: '',
    lastName: '',
    password: '',
    password_confirmation: '',
    country: 'United States',
  },
};

const searchSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setMobileNumber: (state, {payload}: PayloadAction<string>) => {
      state.profile.mobileNo = payload;
    },
    setCountryName: (state, {payload}: PayloadAction<string>) => {
      state.profile.country = payload;
    },
    setName: (
      state,
      {payload}: PayloadAction<{firstName: string; lastName: string}>,
    ) => {
      state.profile.firstName = payload.firstName;
      state.profile.lastName = payload.lastName;
    },
    setPassword: (
      state,
      {
        payload,
      }: PayloadAction<{password: string; password_confirmation: string}>,
    ) => {
      state.profile.password = payload.password;
      state.profile.password_confirmation = payload.password_confirmation;
    },
  },
});

export const {setMobileNumber, setName, setPassword, setCountryName} =
  searchSlice.actions;
export default searchSlice.reducer;

export const getSignUpProfile = (state: RootState) => state.signUp.profile;
