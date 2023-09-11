import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {ImageURISource} from 'react-native';
import {loadCorrds} from 'services/common';
import services from 'services';

export interface searchItem {
  id: number;
  name: string;
  image: ImageURISource;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface Seaches {
  search: searchItem[];
  searchFilterServices: any[];
  miles: number;
  date: any;
  time: any;
  coords: any;
  mapCoords: any;
  searchHereToggle: boolean;
  selectedPro: any;
  showProCard: boolean;
  allProviders: any;
  allProviderLoading: boolean;
  allFriendsProviders: any;
  allFriendsProviderLoading: boolean;
  myProviders: any;
  myProvidersLoading: boolean;
  searchProvidersList: [];
  publicProvidersMedia: any;
  publicProvidersMediaLoading: boolean;

  ProvidersMedia: any;
  ProvidersMediaLoading: boolean;

  friendsMedia: any;
  friendsMediaLoading: boolean;

  searchedMedia: any;
  searchedMediaLoading: boolean;

  suggestionsList: any[];
  searchText: string;
  bottomSheetActive: boolean;

  error: any;
}

export const initialState: Seaches = {
  search: [],
  searchFilterServices: [],
  miles: 100,
  date: undefined,
  time: undefined,
  coords: {lat: null, long: null},
  mapCoords: {lat: null, long: null},
  searchHereToggle: false,
  selectedPro: undefined,
  showProCard: false,
  allProviders: [],
  allProviderLoading: false,
  allFriendsProviders: [],
  allFriendsProviderLoading: false,
  myProviders: [],
  myProvidersLoading: false,
  searchProvidersList: [],
  publicProvidersMedia: [],
  publicProvidersMediaLoading: false,
  suggestionsList: [],
  searchedMedia: [],
  searchedMediaLoading: false,
  friendsMedia: [],
  friendsMediaLoading: false,

  ProvidersMedia: [],
  ProvidersMediaLoading: false,
  searchText: '',
  bottomSheetActive: false,
  error: undefined,
};

export const fetchAllProviders = createAsyncThunk(
  'member/fetchAllProviders',
  async () => {
    const response = await services.getAllProviders();
    return response.data?.data;
  },
);
export const fetchFriendProviders = createAsyncThunk(
  'member/fetchFriendProviders',
  async (params: any) => {
    const response = await services.searchProviders({friendsPros: 1});

    return response.data?.data;
  },
);
export const fetchMyProviders = createAsyncThunk(
  'member/fetchMyProviders',
  async (params: any) => {
    const response = await services.searchProviders({myPros: 1});

    return response.data?.data;
  },
);

export const fetchPublicProvidersMedia = createAsyncThunk(
  'member/fetchPublicProvidersMedia',
  async () => {
    const response = await services.getAllPublicMedia();

    return response.data?.data;
  },
);

export const fetchSearchedMedia = createAsyncThunk(
  'member/fetchSearchedMedia',
  async (param: any) => {
    const response = await services.getSearchedMedia(param);

    return response.data?.data;
  },
);

export const fetchProvidersMedia = createAsyncThunk(
  'member/fetchProvidersMedia',
  async () => {
    const response = await services.getAllProvidersMedia();

    return response.data?.data;
  },
);

export const fetchFriendsMedia = createAsyncThunk(
  'member/fetchFriendsMedia',
  async () => {
    const response = await services.getAllFriendsMedia();

    return response.data?.data;
  },
);

export const fetchSuggestiveText = createAsyncThunk(
  'member/fetchSuggestiveText',
  async (text: string) => {
    const response = await services.getSearchSuggestions(text);

    return response.data?.data;
  },
);

export const fetchSearchedProvider = createAsyncThunk(
  'member/fetchSearchedProvider',
  async (body: any) => {
    const response = await services.searchedProvider(body);

    return response.data?.data;
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, {payload}: PayloadAction<searchItem[]>) => {
      state.search = payload;
    },
    setSearchFilterServices: (state, {payload}: PayloadAction<any[]>) => {
      state.searchFilterServices = payload;
    },
    setMiles: (state, {payload}: PayloadAction<number>) => {
      state.miles = payload;
    },
    setDate: (state, {payload}: PayloadAction<any>) => {
      state.date = payload;
    },
    setTime: (state, {payload}: PayloadAction<any>) => {
      state.time = payload;
    },
    setCoords: (state, {payload}: PayloadAction<any>) => {
      state.coords = payload;
    },
    setMapCoords: (state, {payload}: PayloadAction<any>) => {
      state.mapCoords = payload;
    },
    setSearchHereToggle: (state, {payload}: PayloadAction<boolean>) => {
      state.searchHereToggle = payload;
    },
    setSelectedPro: (state, {payload}: PayloadAction<any>) => {
      state.selectedPro = payload;
    },
    setShowProCard: (state, {payload}: PayloadAction<boolean>) => {
      state.showProCard = payload;
    },
    setAllProviders: (state, {payload}: PayloadAction<boolean>) => {
      state.allProviders = payload;
    },
    setFriendsProviders: (state, {payload}: PayloadAction<boolean>) => {
      state.allFriendsProviders = payload;
    },

    setMyProviders: (state, {payload}: PayloadAction<boolean>) => {
      state.myProviders = payload;
    },
    setPublicProviderMedia: (state, {payload}: PayloadAction<boolean>) => {
      state.publicProvidersMedia = payload;
    },
    setSearchText: (state, {payload}: PayloadAction<string>) => {
      state.searchText = payload;
    },
    setBottomSheetActive: (state, {payload}: PayloadAction<boolean>) => {
      state.bottomSheetActive = payload;
    },
    setSuggestionsList: (state, {payload}: PayloadAction<any[]>) => {
      state.suggestionsList = payload;
    },
  },
  extraReducers(builder) {
    builder
      ////////addcontact/////////////////
      .addCase(fetchAllProviders.pending, (state, action) => {
        state.allProviderLoading = true;
      })
      .addCase(fetchAllProviders.fulfilled, (state, action) => {
        state.allProviderLoading = false;
        state.allProviders = action.payload;
      })
      .addCase(fetchAllProviders.rejected, (state, action) => {
        state.allProviderLoading = false;
        state.error = action.error;
      }) ////////PublicProviders/////////////////
      .addCase(fetchFriendProviders.pending, (state, action) => {
        state.allProviderLoading = true;
      })
      .addCase(fetchFriendProviders.fulfilled, (state, action) => {
        state.allFriendsProviderLoading = false;
        state.allFriendsProviders = action.payload;
      })
      .addCase(fetchFriendProviders.rejected, (state, action) => {
        state.allFriendsProviderLoading = false;
        state.error = action.error;
      }) ////////MyProviders/////////////////
      .addCase(fetchMyProviders.pending, (state, action) => {
        state.myProvidersLoading = true;
      })
      .addCase(fetchMyProviders.fulfilled, (state, action) => {
        state.myProvidersLoading = false;
        state.myProviders = action.payload;
      })
      .addCase(fetchMyProviders.rejected, (state, action) => {
        state.myProvidersLoading = false;
        state.error = action.error;
      })
      ////////mediapublicProviders/////////////////
      .addCase(fetchPublicProvidersMedia.pending, (state, action) => {
        state.publicProvidersMediaLoading = true;
      })
      .addCase(fetchPublicProvidersMedia.fulfilled, (state, action) => {
        state.publicProvidersMediaLoading = false;
        state.publicProvidersMedia = action.payload;
      })
      .addCase(fetchPublicProvidersMedia.rejected, (state, action) => {
        state.publicProvidersMediaLoading = false;
        state.error = action.error;
      })
      ////////mediaSearched/////////////////
      .addCase(fetchSearchedMedia.pending, (state, action) => {
        state.searchedMediaLoading = true;
      })
      .addCase(fetchSearchedMedia.fulfilled, (state, action) => {
        state.searchedMediaLoading = false;
        state.searchedMedia = action.payload;
      })
      .addCase(fetchSearchedMedia.rejected, (state, action) => {
        state.searchedMediaLoading = false;
        state.error = action.error;
      }) ////////mediaProviders/////////////////
      .addCase(fetchProvidersMedia.pending, (state, action) => {
        state.ProvidersMediaLoading = true;
      })
      .addCase(fetchProvidersMedia.fulfilled, (state, action) => {
        state.ProvidersMediaLoading = false;
        state.ProvidersMedia = action.payload;
      })
      .addCase(fetchProvidersMedia.rejected, (state, action) => {
        state.ProvidersMediaLoading = false;
        state.error = action.error;
      })
      ////////mediaProviders/////////////////
      .addCase(fetchFriendsMedia.pending, (state, action) => {
        state.friendsMediaLoading = true;
      })
      .addCase(fetchFriendsMedia.fulfilled, (state, action) => {
        state.friendsMediaLoading = false;
        state.friendsMedia = action.payload;
      })
      .addCase(fetchFriendsMedia.rejected, (state, action) => {
        state.friendsMediaLoading = false;
        state.error = action.error;
      })
      .addCase(fetchSuggestiveText.fulfilled, (state, action) => {
        state.suggestionsList = action.payload;
      })
      .addCase(fetchSearchedProvider.fulfilled, (state, action) => {
        state.searchProvidersList = action.payload;
      });
  },
});

export const {
  setSearch,
  setSearchFilterServices,
  setMiles,
  setDate,
  setTime,
  setCoords,
  setMapCoords,
  setSearchHereToggle,
  setSelectedPro,
  setShowProCard,
  setAllProviders,
  setFriendsProviders,
  setMyProviders,
  setPublicProviderMedia,
  setSearchText,
  setBottomSheetActive,
  setSuggestionsList,
} = searchSlice.actions;
export default searchSlice.reducer;

export const searchSelector = (state: RootState) => state.search?.search;

export const getSearchFilterServices = (state: RootState) =>
  state.search.searchFilterServices;
export const getMiles = (state: RootState) => state.search.miles;
export const getDate = (state: RootState) => state.search.date;
export const getTime = (state: RootState) => state.search.time;
export const getCoords = (state: RootState) => state.search.coords;
export const getMapCoords = (state: RootState) => state.search.mapCoords;
export const getSearchHereToggle = (state: RootState) =>
  state.search.searchHereToggle;
export const getSelectedPro = (state: RootState) => state.search.selectedPro;
export const getShowProCard = (state: RootState) => state.search.showProCard;

export const getAllProviders = (state: RootState) => state.search.allProviders;
export const getAllFriendsProviders = (state: RootState) =>
  state.search.allFriendsProviders;

export const getMyProviders = (state: RootState) => state.search.myProviders;
export const getPublicProviderMedia = (state: RootState) =>
  state.search.publicProvidersMedia;

export const getProviderMedia = (state: RootState) =>
  state.search.ProvidersMedia;

export const getSearchSuggestionsList = (state: RootState) =>
  state.search.suggestionsList;

export const getSearchText = (state: RootState) => state.search.searchText;
export const getBottomSheetState = (state: RootState) =>
  state.search.bottomSheetActive;

export const getSearchProvidersList = (state: RootState) =>
  state.search.searchProvidersList;

export const getFriendsMedia = (state: RootState) => state.search.friendsMedia;

export const getSearchedMedia = (state: RootState) =>
  state.search.searchedMedia;
