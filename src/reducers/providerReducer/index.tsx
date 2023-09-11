import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import services from 'services';
import {RootState} from 'store';

export interface Provider {
  providerProfileLoading: boolean;
  providerAppointmentLoading: boolean;
  isFavLoading: boolean;
  providerId: any;
  disConnectProviderResponse: any[];
  disConnectProviderLoading: boolean;
  providerFav: any;
  providerProfile: {};
  profileImage: {
    item: {};
    isActive: boolean;
  };
  providerLastAppointment: {};
  providerNextAppointment: {};
  searchedProviders: any[];
  searchedProvidersLoading: boolean;
  searchText: boolean;
  error: any;
}

export const initialState: Provider = {
  providerProfileLoading: true,
  isFavLoading: false,
  disConnectProviderResponse: [],
  searchText: false,
  profileImage: {
    item: {},
    isActive: false,
  },
  disConnectProviderLoading: false,
  providerLastAppointment: {},
  providerNextAppointment: {},
  searchedProviders: [],
  searchedProvidersLoading: false,
  providerAppointmentLoading: false,
  providerId: 0,
  providerFav: 0,
  providerProfile: {},
  error: undefined,
};
export const fetchProviderProfile = createAsyncThunk(
  'member/providerProfile',
  async (id: any, {rejectWithValue}) => {
    try {
      const res = await services.getProviderProfileConnections(id);
      return res?.data?.data?.provider1;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchNoConnectionProviderProfile = createAsyncThunk(
  'member/fetchNoConnectionProviderProfile',
  async (id: any, {rejectWithValue}) => {
    try {
      const res = await services.GetProviderProfile(id);
      return res?.data?.data;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data);
    }
  },
);
export const fetchSearchProviders = createAsyncThunk(
  'member/fetchSearchProviders',
  async (data: any, {rejectWithValue}) => {
    try {
      const res = await services.searchProviders(data);
      return res?.data?.data;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchProviderNextAppointment = createAsyncThunk(
  'member/providerNextAppointment',
  async (id: any) => {
    const res = await services.getProviderNextAppointments(id);
    return res?.data?.data;
  },
);

export const fetchProviderLastAppointment = createAsyncThunk(
  'member/providerLastAppointment',
  async (data: any, {rejectWithValue}) => {
    try {
      const res = await services.getProviderLastAppointments(data);
      console.log('ResponseDataAll', res);

      return res?.data?.data;
    } catch (err) {
      console.log('errData', JSON.stringify(err.response.data, null, 2));
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
export const postProviderFav = createAsyncThunk(
  'member/providerFav',
  async (data: any) => {
    const res = await services.postProviderFav(data);
    console.log('ISFavProviderData', res?.data?.data?.isFav);
    return res?.data?.data?.isFav == 1;
  },
);

export const disConnectProvider = createAsyncThunk(
  'member/disconnectProvider',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await services.disconnectProvider(data);
      console.log('ResponseDataAll', response);

      return response.data.success;
    } catch (err) {
      console.log('errData', JSON.stringify(err.response.data, null, 2));
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

const searchSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    setProviderProfile: (state, {payload}: PayloadAction<any[]>) => {
      state.providerProfile = payload;
    },
    setProviderId: (state, {payload}: PayloadAction<any>) => {
      state.providerId = payload;
    },
    setProviderFav: (state, {payload}: PayloadAction<any>) => {
      state.providerFav = payload;
    },
    setSelectedImage: (state, {payload}: PayloadAction<any>) => {
      state.profileImage = payload;
    },
    setEmptyImage: (state, {payload}: PayloadAction<any>) => {
      state.profileImage = initialState.profileImage;
    },

    setProviderLastAppointment: (state, {payload}: PayloadAction<any[]>) => {
      state.providerLastAppointment = payload;
    },
    setProviderNextAppointment: (state, {payload}: PayloadAction<any[]>) => {
      state.providerNextAppointment = payload;
    },
    setDisConnectProviderResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.disConnectProviderResponse = payload;
    },

    setSearchedProviders: (state, {payload}: PayloadAction<any[]>) => {
      state.searchedProviders = payload;
    },
    setSearchedText: (state, {payload}: PayloadAction<any[]>) => {
      state.searchText = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchProviderProfile.pending, (state, action) => {
        state.providerProfileLoading = true;
      })
      .addCase(fetchProviderProfile.fulfilled, (state, action) => {
        state.providerProfileLoading = false;
        state.providerProfile = action.payload;
      })
      .addCase(fetchProviderProfile.rejected, (state, action) => {
        state.providerProfileLoading = false;
        state.error = action.error;
      })
      .addCase(fetchNoConnectionProviderProfile.pending, (state, action) => {
        state.providerProfileLoading = true;
      })
      .addCase(fetchNoConnectionProviderProfile.fulfilled, (state, action) => {
        state.providerProfileLoading = false;
        state.providerProfile = action.payload;
      })
      .addCase(fetchNoConnectionProviderProfile.rejected, (state, action) => {
        state.providerProfileLoading = false;
        state.error = action.error;
      })
      .addCase(fetchProviderNextAppointment.pending, (state, action) => {
        state.providerAppointmentLoading = true;
      })
      .addCase(fetchProviderNextAppointment.fulfilled, (state, action) => {
        state.providerAppointmentLoading = false;
        state.providerNextAppointment = action.payload;
      })
      .addCase(fetchProviderNextAppointment.rejected, (state, action) => {
        state.providerAppointmentLoading = false;
        state.error = action.error;
      })

      .addCase(fetchProviderLastAppointment.pending, (state, action) => {
        state.providerAppointmentLoading = true;
      })
      .addCase(fetchProviderLastAppointment.fulfilled, (state, action) => {
        state.providerAppointmentLoading = false;
        state.providerLastAppointment = action.payload;
      })
      .addCase(fetchProviderLastAppointment.rejected, (state, action) => {
        state.providerAppointmentLoading = false;
        state.error = action.error;
      })

      .addCase(postProviderFav.pending, (state, action) => {
        state.isFavLoading = true;
      })
      .addCase(postProviderFav.fulfilled, (state, action) => {
        state.isFavLoading = false;
        state.providerFav = action.payload;
      })
      .addCase(postProviderFav.rejected, (state, action) => {
        state.isFavLoading = false;
        state.error = action.error;
      })

      .addCase(disConnectProvider.pending, (state, action) => {
        state.disConnectProviderLoading = true;
      })
      .addCase(disConnectProvider.fulfilled, (state, action) => {
        state.disConnectProviderLoading = false;
        state.disConnectProviderResponse = action.payload;
      })
      .addCase(disConnectProvider.rejected, (state, action) => {
        state.disConnectProviderLoading = false;
        state.error = action.error;
      })
      .addCase(fetchSearchProviders.pending, (state, action) => {
        state.searchedProvidersLoading = true;
      })
      .addCase(fetchSearchProviders.fulfilled, (state, action) => {
        state.searchedProvidersLoading = false;
        state.searchedProviders = action.payload;
      })
      .addCase(fetchSearchProviders.rejected, (state, action) => {
        state.searchedProvidersLoading = false;
        state.error = action.error;
      });
  },
});

export const {
  setProviderProfile,
  setProviderId,
  setProviderLastAppointment,
  setProviderNextAppointment,
  setProviderFav,
  setSearchedProviders,
  setSearchedText,
  setSelectedImage,
  setEmptyImage,
} = searchSlice.actions;
export default searchSlice.reducer;
export const getProviderProfile = (state: RootState) =>
  state?.provider?.providerProfile;
export const getProviderId = (state: RootState) => state?.provider?.providerId;
export const getProviderProfileLoading = (state: RootState) =>
  state?.provider?.providerProfileLoading;
export const getProviderNextAppointment = (state: RootState) =>
  state?.provider?.providerNextAppointment;
export const getProviderLastAppointment = (state: RootState) =>
  state?.provider?.providerLastAppointment;

export const getProviderFav = (state: RootState) =>
  state?.provider?.providerFav;

export const getDisConnectProviderResponse = (state: RootState) =>
  state.provider.disConnectProviderResponse;

export const getSelectedImage = (state: RootState) =>
  state.provider.profileImage;

export const getSearchedProviders = (state: RootState) =>
  state.provider.searchedProviders;

export const getSearchText = (state: RootState) => state.provider.searchText;
