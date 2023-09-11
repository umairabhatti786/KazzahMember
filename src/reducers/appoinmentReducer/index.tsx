import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import services from 'services';
import {appontmentStatus} from 'utils';
import _ from 'lodash';

export interface ViewType {
  isList: boolean;
}
export interface Appointments {
  viewType: ViewType;
  allAppointmentsList: any[];
  appointmentReserved: boolean;
  allAppointmentsListLoading: boolean;
  activeAppointmentsList: any[];
  activeAppointmentsListLoading: boolean;

  pendingAppointmentsList: any[];
  pendingAppointmentsListLoading: boolean;

  declinedAppointmentsList: any[];
  declinedAppointmentsListLoading: boolean;

  pastAppointmentsList: any[];
  pastAppointmentsListLoading: boolean;

  appointmentDetails: any[];
  appointmentDetailLoading: boolean;

  recentAppointments: any[];
  recentAppointmentsLoading: boolean;

  error: any;

  appointmentFilter: 'All' | 'Active' | 'Pending' | 'Declined' | 'Past';
}

export const initialState: Appointments = {
  viewType: {
    isList: true,
  },
  allAppointmentsList: [],
  appointmentReserved: false,
  allAppointmentsListLoading: false,
  activeAppointmentsList: [],
  activeAppointmentsListLoading: false,
  pendingAppointmentsList: [],
  pendingAppointmentsListLoading: false,

  declinedAppointmentsList: [],
  declinedAppointmentsListLoading: false,

  pastAppointmentsList: [],
  pastAppointmentsListLoading: false,

  appointmentDetails: [],
  appointmentDetailLoading: false,

  recentAppointments: [],
  recentAppointmentsLoading: false,
  appointmentFilter: 'All',
  error: undefined,
};
export const fetchAllAppointmentsList = createAsyncThunk(
  'member/allAppointmentsList',
  async () => {
    const response = await services.getAppointmentsList(
      `?status=${appontmentStatus.ALL}`,
    );

    const sortedByDate = _.orderBy(
      response.data?.data,
      item => item?.appointmentDate?.toLowerCase(),
      ['asc'],
    );
    return sortedByDate;
  },
);

export const fetchRecentAppointments = createAsyncThunk(
  'member/fetchRecentAppointments',
  async (id: any) => {
    const response = await services.getRecentAppointments(id);

    return response.data?.data;
  },
);
export const fetchActiveAppointmentsList = createAsyncThunk(
  'member/activeAppointmentsList',
  async () => {
    const response = await services.getAppointmentsList(
      `?status=${appontmentStatus.ACTIVE}`,
    );
    const sortedByDate = _.orderBy(
      response.data?.data,
      item => item?.appointmentDate?.toLowerCase(),
      ['asc'],
    );
    return sortedByDate;
  },
);
export const fetchPendingAppointmentsList = createAsyncThunk(
  'member/pendingAppointmentsList',
  async () => {
    const response = await services.getAppointmentsList(
      `?status=${appontmentStatus.PENDING}`,
    );
    const sortedByDate = _.orderBy(
      response.data?.data,
      item => item?.appointmentDate?.toLowerCase(),
      ['asc'],
    );
    return sortedByDate;
  },
);

export const fetchDeclinedAppointmentsList = createAsyncThunk(
  'member/declinedAppointmentsList',
  async () => {
    const response = await services.getAppointmentsList(
      `?status=${appontmentStatus.DECLINED}`,
    );
    const sortedByDate = _.orderBy(
      response.data?.data,
      item => item?.appointmentDate?.toLowerCase(),
      ['asc'],
    );
    return sortedByDate;
  },
);

export const fetchPastAppointmentsList = createAsyncThunk(
  'member/pastAppointmentsList',
  async () => {
    const response = await services.getAppointmentsList(
      `?status=${appontmentStatus.PAST}`,
    );
    const sortedByDate = _.orderBy(
      response.data?.data,
      item => item?.appointmentDate?.toLowerCase(),
      ['asc'],
    );
    return sortedByDate;
  },
);

export const fetchAppointmentDetails = createAsyncThunk(
  'member/appointmentDetails',
  async (id: any) => {
    const response = await services.getAppointmentDetail(id);
    return response.data?.data;
  },
);

export const postAppointment = createAsyncThunk(
  'member/postAppointment',
  async (appointment: any) => {
    const response = await services.postAppointment(appointment);
    return response.data?.data;
  },
);
const appoinmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointmentView: (state, {payload}: PayloadAction<boolean>) => {
      state.viewType.isList = payload;
    },
    setAppointmentFilter: (
      state,
      {
        payload,
      }: PayloadAction<'All' | 'Active' | 'Pending' | 'Declined' | 'Past'>,
    ) => {
      state.appointmentFilter = payload;
    },
    setAllAppointmentsList: (state, {payload}: PayloadAction<any[]>) => {
      state.allAppointmentsList = payload;
    },
    setActiveAppointmentsList: (state, {payload}: PayloadAction<any[]>) => {
      state.activeAppointmentsList = payload;
    },
    setPendingAppointmentsList: (state, {payload}: PayloadAction<any[]>) => {
      state.pendingAppointmentsList = payload;
    },

    setDeclinedAppointmentsList: (state, {payload}: PayloadAction<any[]>) => {
      state.declinedAppointmentsList = payload;
    },

    setPastAppointmentsList: (state, {payload}: PayloadAction<any[]>) => {
      state.declinedAppointmentsList = payload;
    },

    setAppointmentDetails: (state, {payload}: PayloadAction<any[]>) => {
      state.appointmentDetails = payload;
    },
    setAppointmentReserved: (state, {payload}: PayloadAction<any>) => {
      state.appointmentReserved = payload;
    },
  },

  extraReducers(builder) {
    builder
      ////////allappointments/////////////////
      .addCase(fetchAllAppointmentsList.pending, (state, action) => {
        state.allAppointmentsListLoading = true;
      })
      .addCase(fetchAllAppointmentsList.fulfilled, (state, action) => {
        state.allAppointmentsListLoading = false;
        state.allAppointmentsList = action.payload;
      })
      .addCase(fetchAllAppointmentsList.rejected, (state, action) => {
        state.allAppointmentsListLoading = false;
        state.error = action.error;
      })
      ////////allappointments/////////////////
      .addCase(fetchRecentAppointments.pending, (state, action) => {
        state.recentAppointmentsLoading = true;
      })
      .addCase(fetchRecentAppointments.fulfilled, (state, action) => {
        state.recentAppointmentsLoading = false;
        state.recentAppointments = action.payload;
      })
      .addCase(fetchRecentAppointments.rejected, (state, action) => {
        state.recentAppointmentsLoading = false;
        state.error = action.error;
      })

      ////////activeappointments/////////////////
      .addCase(fetchActiveAppointmentsList.pending, (state, action) => {
        state.activeAppointmentsListLoading = true;
      })
      .addCase(fetchActiveAppointmentsList.fulfilled, (state, action) => {
        state.activeAppointmentsListLoading = false;
        state.activeAppointmentsList = action.payload;
      })
      .addCase(fetchActiveAppointmentsList.rejected, (state, action) => {
        state.activeAppointmentsListLoading = false;
        state.error = action.error;
      })
      ////////pendingappointments/////////////////
      .addCase(fetchPendingAppointmentsList.pending, (state, action) => {
        state.pendingAppointmentsListLoading = true;
      })
      .addCase(fetchPendingAppointmentsList.fulfilled, (state, action) => {
        state.pendingAppointmentsListLoading = false;
        state.pendingAppointmentsList = action.payload;
      })
      .addCase(fetchPendingAppointmentsList.rejected, (state, action) => {
        state.pendingAppointmentsListLoading = false;
        state.error = action.error;
      })
      ////////declinedappointments/////////////////
      .addCase(fetchDeclinedAppointmentsList.pending, (state, action) => {
        state.declinedAppointmentsListLoading = true;
      })
      .addCase(fetchDeclinedAppointmentsList.fulfilled, (state, action) => {
        state.declinedAppointmentsListLoading = false;
        state.declinedAppointmentsList = action.payload;
      })
      .addCase(fetchDeclinedAppointmentsList.rejected, (state, action) => {
        state.declinedAppointmentsListLoading = false;
        state.error = action.error;
      })
      ////////pastappointments/////////////////
      .addCase(fetchPastAppointmentsList.pending, (state, action) => {
        state.pastAppointmentsListLoading = true;
      })
      .addCase(fetchPastAppointmentsList.fulfilled, (state, action) => {
        state.pastAppointmentsListLoading = false;
        state.pastAppointmentsList = action.payload;
      })
      .addCase(fetchPastAppointmentsList.rejected, (state, action) => {
        state.pastAppointmentsListLoading = false;
        state.error = action.error;
      })
      ////////getAppointmentDetails/////////////////
      .addCase(fetchAppointmentDetails.pending, (state, action) => {
        state.appointmentDetailLoading = true;
      })
      .addCase(fetchAppointmentDetails.fulfilled, (state, action) => {
        state.appointmentDetailLoading = false;
        state.appointmentDetails = action.payload;
      })
      .addCase(fetchAppointmentDetails.rejected, (state, action) => {
        state.appointmentDetailLoading = false;
        state.error = action.error;
      });
  },
});

export const {
  setAppointmentView,
  setAppointmentFilter,
  setAllAppointmentsList,
  setActiveAppointmentsList,
  setPendingAppointmentsList,
  setDeclinedAppointmentsList,
  setPastAppointmentsList,
  setAppointmentDetails,
  setAppointmentReserved,
} = appoinmentSlice.actions;
export default appoinmentSlice.reducer;

export const getAppointmentView = (state: RootState) =>
  state.appointments.viewType;
export const getAppointmentFilter = (state: RootState) =>
  state.appointments.appointmentFilter;
export const getAllAppointmentList = (state: RootState) =>
  state.appointments.allAppointmentsList;
export const getActiveAppointmentList = (state: RootState) =>
  state.appointments.activeAppointmentsList;
export const getPendingAppointmentList = (state: RootState) =>
  state.appointments.pendingAppointmentsList;
export const getDeclinedAppointmentList = (state: RootState) =>
  state.appointments.declinedAppointmentsList;

export const getPastAppointmentList = (state: RootState) =>
  state.appointments.pastAppointmentsList;

export const getAppointmentDetails = (state: RootState) =>
  state.appointments.appointmentDetails;

export const getAppointmentDetailsLoading = (state: RootState) =>
  state.appointments.appointmentDetailLoading;

export const getRecentAppointments = (state: RootState) =>
  state.appointments.recentAppointments;
export const getAppointmentReserved = (state: RootState) =>
  state.appointments.appointmentReserved;

export const getAllAppointmentLists = (state: RootState) => {
  return {
    All: state.appointments.allAppointmentsList,
    Active: state.appointments.activeAppointmentsList,
    Pending: state.appointments.pendingAppointmentsList,
    Declined: state.appointments.declinedAppointmentsList,
    Past: state.appointments.pastAppointmentsList,
  };
};
