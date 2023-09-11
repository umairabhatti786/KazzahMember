import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {string} from 'yup';

export interface AddProType {
  client_team_id: string;
  first_name: string;
  last_name: string;
  mobileNo: string;
  serviceId: string;
  image: string;
  latitude: string;
  longitude: string;
  businessName?: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isKazzahUser: boolean;
}
export interface AddPro {
  addPro: AddProType;
  channelId: string;
  selectedServiceId: string;
}

export const initialState: AddPro = {
  addPro: {
    client_team_id: '',
    first_name: '',
    last_name: '',
    mobileNo: '',
    serviceId: '',
    image: '',
    latitude: '',
    longitude: '',
    businessName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    isKazzahUser: false,
  },
  channelId: '',
  selectedServiceId: '',
};

const searchSlice = createSlice({
  name: 'addPro',
  initialState,
  reducers: {
    setBusinessName: (state, {payload}: PayloadAction<string>) => {
      state.addPro.businessName = payload;
    },
    setIsKazzahUser: (state, {payload}: PayloadAction<boolean>) => {
      state.addPro.isKazzahUser = payload;
    },
    setTeamId: (state, {payload}: PayloadAction<string>) => {
      console.log('TeamDataData', payload);
      state.addPro.client_team_id = payload;
    },
    setChannelId: (state, {payload}: PayloadAction<string>) => {
      state.channelId = payload;
    },
    setSelectedServiceId: (state, {payload}: PayloadAction<string>) => {
      state.selectedServiceId = payload;
    },
    setServiceId: (state, {payload}: PayloadAction<string>) => {
      state.addPro.serviceId = payload;
    },

    setEmptyMobileNo: state => {
      state.addPro.mobileNo = '';
    },

    setEmptyAddPro: state => {
      state.addPro.mobileNo = '';
      state.addPro.serviceId = '';
    },
    setAddress: (
      state,
      {
        payload,
      }: PayloadAction<{
        street: string;
        city: string;
        state: string;
        zip: string;
      }>,
    ) => {
      state.addPro.street = payload.street;
      state.addPro.city = payload.city;
      state.addPro.state = payload.state;
      state.addPro.zip = payload.zip;
    },
    setName: (
      state,
      {
        payload,
      }: PayloadAction<{
        businessName?: string;
        first_name: string;
        last_name: string;
      }>,
    ) => {
      state.addPro.businessName = payload.businessName;
      state.addPro.first_name = payload.first_name;
      state.addPro.last_name = payload.last_name;
    },
    setMobileNumber: (
      state,
      {
        payload,
      }: PayloadAction<{
        mobileNo: string;
        email?: string;
      }>,
    ) => {
      state.addPro.mobileNo = payload.mobileNo;
      if (payload.email) {
        state.addPro.email = payload.email;
      }
    },
  },
});

export const {
  setBusinessName,
  setAddress,
  setName,
  setMobileNumber,
  setChannelId,
  setTeamId,
  setServiceId,
  setIsKazzahUser,
  setEmptyMobileNo,
  setEmptyAddPro,
  setSelectedServiceId,
} = searchSlice.actions;
export default searchSlice.reducer;

export const getAddPro = (state: RootState) => state.addPro.addPro;
export const getChannelId = (state: RootState) => state.addPro.channelId;
export const getSelectedServiceId = (state: RootState) =>
  state.addPro.selectedServiceId;
