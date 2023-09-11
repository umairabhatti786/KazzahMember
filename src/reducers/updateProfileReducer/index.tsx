import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import services from 'services';
import {appontmentStatus} from 'utils';
import _ from 'lodash';
export interface SelectedMediaDetails {
  media: any;
  tags: [];
  description: string;
  mediaId: any;
  ProCount: any;
}
export interface UpdateProfile {
  updateProfileResponse: any[];
  updateProfileLoading: boolean;
  selectedMediaDetails: SelectedMediaDetails;

  updatePasswordResponse: any[];
  updatePasswordLoading: boolean;
  uploadMediaResponse: any[];
  uploadMediaLoading: boolean;

  mediaResponse: any[];
  mediaLoading: boolean;

  deleteCardResponse: any[];
  deleteCardLoading: boolean;
  updateMediaResponse: any[];
  updateMediaLoading: boolean;

  deleteMediaResponse: any[];
  deleteMediaLoading: boolean;

  updateProfileImageResponse: any[];
  updateProfileImageLoading: boolean;

  error: any;
}

export const initialState: UpdateProfile = {
  deleteMediaResponse: [],
  deleteMediaLoading: false,
  updateProfileImageResponse: [],
  updateProfileImageLoading: false,
  updateProfileResponse: [],
  deleteCardResponse: [],
  deleteCardLoading: false,
  updateMediaResponse: [],
  updateMediaLoading: false,
  mediaResponse: [],
  mediaLoading: false,
  updateProfileLoading: false,
  updatePasswordResponse: [],
  uploadMediaResponse: [],
  uploadMediaLoading: false,
  selectedMediaDetails: {
    media: null,
    tags: [],
    description: '',
    mediaId: null,
    ProCount: 0,
  },
  updatePasswordLoading: false,
  error: undefined,
};
export const updateProfile = createAsyncThunk(
  'member/updateProfile',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await services.updateProfile(data);
      return response.data;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
export const deleteCard = createAsyncThunk(
  'member/deleteCard',
  async (id: any, {rejectWithValue}) => {
    try {
      const response = await services.deletePaymentCard(id);
      return response.data;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
export const getProfileMedia = createAsyncThunk(
  'member/getProfileMedia',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await services.getExploreMedia();
      return response?.data?.data;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
export const uploadMedia = createAsyncThunk(
  'member/uploadMedia',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await services.createMedia(data);

      return response.data;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
export const updateMedia = createAsyncThunk(
  'member/updateMedia',
  async (params: any, {rejectWithValue}) => {
    const {data, id} = params;

    try {
      const response = await services.updateMedia(data, id);
      return response.data;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
export const deleteMedia = createAsyncThunk(
  'member/deleteMedia',
  async (id: any, {rejectWithValue}) => {
    try {
      const response = await services.deleteMedia(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const updateProfileImage = createAsyncThunk(
  'member/updateProfileImage',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await services.UplaodProfilePhoto(data);
      return response.data;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
export const updatePassword = createAsyncThunk(
  'member/updatePassword',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await services.updatePassword(data);
      return response.data;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
const updateprofileSlice = createSlice({
  name: 'UpdateProfile',
  initialState,
  reducers: {
    setUpdateProfileResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.updateProfileResponse = payload;
    },

    setUpdatePasswordResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.updatePasswordResponse = payload;
    },
    setSelectedMediaDetails: (state, {payload}: PayloadAction<any[]>) => {
      state.selectedMediaDetails = payload;
    },
    setUploadMediaResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.uploadMediaResponse = payload;
    },

    setProfileMediaResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.mediaResponse = payload;
    },
    setDeleteCardResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.deleteCardResponse = payload;
    },
    setUpdateMediaResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.updateMediaResponse = payload;
    },
    setDeleteMediaResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.deleteMediaResponse = payload;
    },

    setUpdateProfileImageResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.updateProfileImageResponse = payload;
    },

    extraReducers(builder) {
      builder ////////updateprofile/////////////////
        .addCase(updateProfile.pending, (state, action) => {
          state.updateProfileLoading = true;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.updateProfileLoading = false;
          state.updateProfileResponse = action.payload;
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.updateProfileLoading = false;
          state.error = action.error;
        })
        ///////////updatepassword//////
        .addCase(updatePassword.pending, (state, action) => {
          state.updatePasswordLoading = true;
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
          state.updatePasswordLoading = false;
          state.updatePasswordResponse = action.payload;
        })
        .addCase(updatePassword.rejected, (state, action) => {
          state.updatePasswordLoading = false;
          state.error = action.error;
        })
        ///////////uploadMedia//////
        .addCase(uploadMedia.pending, (state, action) => {
          state.uploadMediaLoading = true;
        })
        .addCase(uploadMedia.fulfilled, (state, action) => {
          state.uploadMediaLoading = false;
          state.uploadMediaResponse = action.payload;
        })
        .addCase(uploadMedia.rejected, (state, action) => {
          state.uploadMediaLoading = false;
          state.error = action.error;
        })
        ///////////uploadMedia//////
        .addCase(getProfileMedia.pending, (state, action) => {
          state.mediaLoading = true;
        })
        .addCase(getProfileMedia.fulfilled, (state, action) => {
          state.mediaLoading = false;
          state.mediaResponse = action.payload;
        })
        .addCase(getProfileMedia.rejected, (state, action) => {
          state.mediaLoading = false;
          state.error = action.error;
        })
        .addCase(deleteCard.pending, (state, action) => {
          state.deleteCardLoading = true;
        })
        .addCase(deleteCard.fulfilled, (state, action) => {
          state.deleteCardLoading = false;
          state.deleteCardResponse = action.payload;
        })
        .addCase(deleteCard.rejected, (state, action) => {
          state.deleteCardLoading = false;
        }) ///////////updatedMedia//////
        .addCase(updateMedia.pending, (state, action) => {
          state.updateMediaLoading = true;
        })
        .addCase(updateMedia.fulfilled, (state, action) => {
          state.updateMediaLoading = false;
          state.updateMediaResponse = action.payload;
        })
        .addCase(updateMedia.rejected, (state, action) => {
          state.updateMediaLoading = false;
          state.error = action.error;
        }) ///////////deletedMedia//////
        .addCase(deleteMedia.pending, (state, action) => {
          state.deleteMediaLoading = true;
        })
        .addCase(deleteMedia.fulfilled, (state, action) => {
          state.deleteMediaLoading = false;
          state.deleteMediaResponse = action.payload;
        })
        .addCase(deleteMedia.rejected, (state, action) => {
          state.deleteMediaLoading = false;
          state.error = action.error;
        })
        ///////////updateprofileimage//////
        .addCase(updateProfileImage.pending, (state, action) => {
          state.updateProfileImageLoading = true;
        })
        .addCase(updateProfileImage.fulfilled, (state, action) => {
          state.updateProfileImageLoading = false;
          state.updateProfileImageResponse = action.payload;
        })
        .addCase(updateProfileImage.rejected, (state, action) => {
          state.updateProfileImageLoading = false;
          state.error = action.error;
        });
    },
  },
});
export const {
  setUpdateProfileResponse,
  setUpdatePasswordResponse,
  setSelectedMediaDetails,
  setUploadMediaResponse,
  setProfileMediaResponse,
  setDeleteCardResponse,
  setDeleteMediaResponse,
  setUpdateProfileImageResponse,
} = updateprofileSlice.actions;
export default updateprofileSlice.reducer;

export const getUpdateProfileResponse = (state: RootState) =>
  state.updateProfile.updateProfileResponse;

export const getUpdatePasswordResponse = (state: RootState) =>
  state.updateProfile.updatePasswordResponse;
export const getSelectedMediaDetails = (state: RootState) =>
  state.updateProfile.selectedMediaDetails;

export const getUpoadMediaResponse = (state: RootState) =>
  state.updateProfile.uploadMediaResponse;

export const getProfileMediaResponse = (state: RootState) =>
  state.updateProfile.mediaResponse;

export const getProfileMediaLoading = (state: RootState) =>
  state.updateProfile.mediaLoading;

export const getDeleteCardResponse = (state: RootState) =>
  state.updateProfile.deleteCardResponse;
export const getUpdateMediaLoading = (state: RootState) =>
  state.updateProfile.updateMediaResponse;

export const getDeleteMediaLoading = (state: RootState) =>
  state.updateProfile.deleteMediaResponse;

export const getProfileImageResponse = (state: RootState) =>
  state.updateProfile.updateProfileImageResponse;

export const getUploadMediaLoading = (state: RootState) =>
  state.updateProfile.uploadMediaLoading;
