import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {removeToken, setToken} from 'core/Auth/utils';
import {RootState} from '../../store';
import {
  loadCorrds,
  loadFeeds,
  loadRootServices,
  loadSyncedMember,
  loadSyncedProviders,
  requestLocationPermission,
  requestUserPermission,
} from 'services/common';
import {Logout} from 'services/profile';

export interface AuthState {
  isLoggedIn: boolean;
  currentUser: CurrentUser;
  appointmentData: any;
  selectedAppointment: SelectedAppointment;
  selectedPro: any;
  signupSetup: SignupState;
  search: any;
  memberContacts: any[];
  providerContacts: any[];
  rootServices: any[];
  selectedAppointmentIdForPayment: Number;
  appointmentParams: any;
  appointmentAddress: string;
  feeds: any[];
  notificationAlert: boolean;
  isBioVerified: boolean;
  currentScreen: string;
}
export interface SelectedService {
  id: string;
  price: Number;
  duration: Number;
  name: string;
}

export interface SignupState {
  firstName: string;
  lastName: string;
  username: string;
  mobileNo: string;
}

export interface SelectedAppointment {
  providerId: Number;
  services: SelectedService[];
  originalServices: SelectedService[];
  date: string;
  startTime: string;
  endTime: string;
  totalDuration: string;
  totalPrice: string;
  tax: Number;
  fee: Number;
  discount: Number;
  isPeakPricing: boolean;
}

export interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  mobileNo: string;
  profileImage: string;
  bio: string;
  address: string;
  appointments: [];
  notes: [];
  status: boolean;
  isMobileVerified: number;
  isEmailVerified: number;
  media: [];
  token: string;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  currentUser: {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    mobileNo: '',
    profileImage: '',
    bio: '',
    address: '',
    appointments: [],
    notes: [],
    status: true,
    isMobileVerified: 0,
    isEmailVerified: 0,
    media: [],
    token: '',
  },
  signupSetup: {
    firstName: '',
    lastName: '',
    username: '',
    mobileNo: '',
  },
  appointmentData: undefined,
  selectedAppointment: {
    providerId: 0,
    services: [],
    originalServices: [],
    date: '',
    startTime: '',
    endTime: '',
    totalDuration: '',
    totalPrice: '',
    tax: 0,
    fee: 0,
    discount: 0,
    isPeakPricing: false,
  },
  selectedPro: undefined,
  search: {radius: 0, providers: []},
  memberContacts: [],
  providerContacts: [],
  rootServices: [],
  selectedAppointmentIdForPayment: 0,
  appointmentParams: undefined,
  appointmentAddress: '',
  feeds: [],
  notificationAlert: false,
  isBioVerified: false,
  currentScreen: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, {payload}: PayloadAction<CurrentUser>) => {
      if (payload.token) {
        setToken({refresh: payload.token, access: payload.token});
      }
      loadSyncedProviders();
      loadSyncedMember();
      loadRootServices();
      loadFeeds();
      loadCorrds();
      requestUserPermission();

      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    setProfile: (state, {payload}: PayloadAction<CurrentUser>) => {
      if (payload.token) {
        setToken({refresh: payload.token, access: payload.token});
      }

      // requestLocationPermission();

      state.currentUser = payload;
    },
    setLogOut: state => {
      removeToken();
      state.isLoggedIn = false;
      state.currentUser = initialState.currentUser;
    },
    setAppointmentData: (state, {payload}: PayloadAction<CurrentUser>) => {
      state.appointmentData = payload;
    },
    setSelectedPro: (state, {payload}: PayloadAction<any>) => {
      state.selectedPro = payload;
    },
    setSearchRadius: (state, {payload}: PayloadAction<any>) => {
      state.search.radius = payload;
    },
    setSearchProviders: (state, {payload}: PayloadAction<any>) => {
      state.search.providers = payload;
    },

    setSignupSetup: (state, {payload}: PayloadAction<SignupState>) => {
      state.signupSetup = payload;
    },
    setSelectedAppointmentServices: (
      state,
      {payload}: PayloadAction<SelectedService>,
    ) => {
      state.selectedAppointment.services.push(payload);
    },
    setAppointmentServices: (
      state,
      {payload}: PayloadAction<SelectedService[]>,
    ) => {
      state.selectedAppointment.services = payload;
    },
    setAppointmentOriginalServices: (
      state,
      {payload}: PayloadAction<SelectedService[]>,
    ) => {
      state.selectedAppointment.originalServices = payload;
    },
    setAppointmentPeakPricing: (state, {payload}: PayloadAction<boolean>) => {
      state.selectedAppointment.isPeakPricing = payload;
    },
    resetSelectedAppointmentServices: state => {
      state.selectedAppointment = initialState.selectedAppointment;
    },
    removeSelectedAppointmentServices: (
      state,
      {payload}: PayloadAction<SelectedService>,
    ) => {
      state.selectedAppointment.services = state.selectedAppointment.services.filter(
        e => e.id != payload.id,
      );
    },
    setProviderContacts: (state, {payload}: PayloadAction<any>) => {
      state.providerContacts = payload;
    },
    setMemberContacts: (state, {payload}: PayloadAction<any>) => {
      state.memberContacts = payload;
    },
    setRootServices: (state, {payload}: PayloadAction<any>) => {
      state.rootServices = payload;
    },
    setSelectedAppointmentIdForPayment: (
      state,
      {payload}: PayloadAction<Number>,
    ) => {
      state.selectedAppointmentIdForPayment = payload;
    },
    setAppointmentParams: (state, {payload}: PayloadAction<any>) => {
      state.appointmentParams = payload;
    },
    setFeeds: (state, {payload}: PayloadAction<any[]>) => {
      state.feeds = payload;
    },
    updateFeedByIndex: (state, {payload}: PayloadAction<any>) => {
      state.feeds[payload.index] = payload.feed;
    },
    setAppointmentAddress: (state, {payload}: PayloadAction<string>) => {
      state.appointmentAddress = payload;
    },
    setNotificationAlert: (state, {payload}: PayloadAction<boolean>) => {
      state.notificationAlert = payload;
    },
    setIsBioVerified: (state, {payload}: PayloadAction<boolean>) => {
      state.isBioVerified = payload;
    },
    setCurrentScreen: (state, {payload}: PayloadAction<string>) => {
      state.currentScreen = payload;
    },
  },
});

export const {
  logIn,
  setLogOut,
  setProfile,
  setAppointmentData,
  setSelectedPro,
  setSelectedAppointmentServices,
  removeSelectedAppointmentServices,
  resetSelectedAppointmentServices,
  setAppointmentServices,
  setAppointmentOriginalServices,
  setSearchProviders,
  setSearchRadius,
  setProviderContacts,
  setMemberContacts,
  setRootServices,
  setAppointmentPeakPricing,
  setSelectedAppointmentIdForPayment,
  setAppointmentParams,
  setFeeds,
  updateFeedByIndex,
  setAppointmentAddress,
  setNotificationAlert,
  setIsBioVerified,
  setCurrentScreen,
  setSignupSetup,
} = authSlice.actions;
export default authSlice.reducer;

export const authSelector = (state: RootState) => state.auth;
export const getAppointmentData = (state: RootState) => state.auth;
export const getIsLoggedIn = (state: RootState) => state?.auth.isLoggedIn;

export const getSelectedAppointment = (state: RootState) =>
  state?.auth.selectedAppointment;

export const getSelectedServiceIds = (state: RootState) =>
  state?.auth.selectedAppointment.services.map(e => e.index);

export const getSelectedPro = (state: RootState) => state?.auth.selectedPro;

export const getSearchData = (state: RootState) => state?.auth.search;

export const getProviderContacts = (state: RootState) =>
  state?.auth.providerContacts;
export const getMemberContacts = (state: RootState) =>
  state?.auth.memberContacts;

export const getSelectedAppointmentIdForPayment = (state: RootState) =>
  state?.auth.selectedAppointmentIdForPayment;

export const getCurrentScreen = (state: RootState) => state?.auth.currentScreen;

export const getRootServices = (state: RootState) => state?.auth.rootServices;
export const getAppointmentParams = (state: RootState) =>
  state?.auth.appointmentParams;
export const getAppointmentAddress = (state: RootState) =>
  state?.auth.appointmentAddress;
export const getNotificationAlert = (state: RootState) =>
  state?.auth.notificationAlert;
export const getIsBioVerified = (state: RootState) => state?.auth.isBioVerified;
export const getSignupSetup = (state: RootState) => state.auth?.signupSetup;

export const getSelectedServicesMins = (state: RootState) =>
  state.auth.selectedAppointment.services.reduce(
    (acc, obj) => acc + Number(obj.duration),
    0,
  );

export const getFeeds = (state: RootState) => {
  let list = state?.auth.feeds;
  list = list.filter(item => {
    return item?.type == 'image';
  });
  return list;
};
