import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import store, {RootState} from '../../store';
import services from 'services';

export interface Notifications {
  notificationsList: any[];
  notificationsListLoading: boolean;
  error: any;
}

export const initialState: Notifications = {
  notificationsList: [],
  notificationsListLoading: false,
  error: undefined,
};

export const fetchAllNotifications = createAsyncThunk(
  'member/notificationsList',
  async id => {
    const response = await services.getNotifications(id);
    return response.data?.data;
  },
);
export const postNotificationStatus = createAsyncThunk(
  'member/notificationStatus',
  async body => {
    const response = await services.notificationStatus(body);
    return response.data?.data;
  },
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, {payload}: PayloadAction<any[]>) => {
      state.notificationsList = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllNotifications.pending, (state, action) => {
        state.notificationsListLoading = true;
      })
      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        state.notificationsListLoading = false;
        state.notificationsList = action.payload;
      })
      .addCase(fetchAllNotifications.rejected, (state, action) => {
        state.notificationsListLoading = false;
        state.error = action.error;
      });
  },
});

export const {setNotification} = notificationSlice.actions;
export default notificationSlice.reducer;

export const notificationsSelector = (state: RootState) =>
  state.notifications?.notificationsList;
