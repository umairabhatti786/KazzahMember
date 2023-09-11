import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import services from 'services';

export interface Configurations {
  appointmentReservationTime: number;
  error: any;
}

export const initialState: Configurations = {
  appointmentReservationTime: 6,
  error: undefined,
};

export const fetchReservationTimeConfig = createAsyncThunk(
  'member/getReservationTimeConfig',
  async () => {
    const response = await services.getReservationTimeConfig();
    return response.data?.data;
  },
);

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setAppointmentReservationTime: (
      state,
      {payload}: PayloadAction<number>,
    ) => {
      state.appointmentReservationTime = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReservationTimeConfig.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(fetchReservationTimeConfig.fulfilled, (state, action) => {
        state.appointmentReservationTime = action.payload.value;
      });
  },
});

export const {setAppointmentReservationTime} = configurationSlice.actions;
export default configurationSlice.reducer;

export const getAppointmentReservationTime = (state: RootState) =>
  state.configurations.appointmentReservationTime;
