import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import services from 'services';
import _ from 'lodash';

export interface AddAppointmentServiceType {
  id: string;
  price: string;
  duration: string;
  peakPrice: string;
}
export interface AddAppointmentProviderType {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  channel: string;
  profilePicture: string;
}
export interface AddAppointmentType {
  appointmentId: number;
  providerId: string;
  scheduleId: string;
  scheduleType: string;
  isReservationFee: string;
  reservationFee: string;
  services: AddAppointmentServiceType[];
  date: string;
  startTime: string;
  endTime: string;
  totalDuration: string;
  totalPrice: string;
  tax: string;
  fee: string;
  discount: string;
  address: string;
  createdAt: any;
}
export interface Appointment {
  addAppointment: AddAppointmentType;
  appointmentProvider?: AddAppointmentProviderType;
  providersList: any[];
  providerListLoading: boolean;
  teamsList: any[];
  teamsListLoading: boolean;
  servicesList: any[];
  servicesListLoading: boolean;
  recentAppointmentsList: any[];
  recentAppointmentsListLoading: boolean;
  prosList: any[];
  prosListLoading: boolean;
  proServicesList: any[];
  selectedServices: any[];
  providerSchedule: any;
  timeSlots: any[];
  createdAt: undefined;
  error: any;
}

export const initialState: Appointment = {
  addAppointment: {
    appointmentId: 0,
    providerId: '',
    scheduleId: '',
    scheduleType: '',
    isReservationFee: '',
    reservationFee: '',
    services: [],
    date: '',
    startTime: '',
    endTime: '',
    totalDuration: '',
    totalPrice: '',
    tax: '',
    fee: '',
    discount: '',
    address: '',
  },
  providersList: [],
  providerListLoading: false,
  teamsList: [],
  teamsListLoading: false,
  servicesList: [],
  servicesListLoading: false,
  recentAppointmentsList: [],
  recentAppointmentsListLoading: false,
  prosList: [],
  prosListLoading: false,
  proServicesList: [],
  selectedServices: [],
  providerSchedule: undefined,
  timeSlots: [],
  error: undefined,
};

export const fetchProvidersList = createAsyncThunk(
  'member/providersList',
  async (filter: boolean) => {
    const response = await services.getMemberTeamsList('?providers=1');

    const newSortOrder = filter ? 'desc' : 'asc';

    const sortedPros = _.orderBy(
      response.data?.data,
      item => item?.provider?.firstName?.toLowerCase(),
      [newSortOrder],
    );

    return sortedPros;
  },
);

export const fetchTeamsList = createAsyncThunk(
  'member/teamsList',
  async (filter: boolean) => {
    const response = await services.getMemberTeamsList('?rootService=1');
    const newSortOrder = filter ? 'desc' : 'asc';
    const sortedPros = _.orderBy(
      response.data?.data,
      item => item?.rootServiceId?.name?.toLowerCase(),
      [newSortOrder],
    );
    return sortedPros;
  },
);

export const fetchServicesList = createAsyncThunk(
  'member/servicesList',
  async (filter: boolean) => {
    const response = await services.getMemberTeamsList('?service=1');
    const newSortOrder = filter ? 'desc' : 'asc';
    const sortedPros = _.orderBy(
      response.data?.data,
      item => item?.serviceId?.name?.toLowerCase(),
      [newSortOrder],
    );
    return sortedPros;
  },
);
export const fetchRecentAppointmentsList = createAsyncThunk(
  'member/recentAppointmentsList',
  async () => {
    const response = await services.getMemberTeamsList('?appointments=1');

    const sortedByDate = _.orderBy(
      response.data?.data,
      item => item?.appointmentDate?.toLowerCase(),
      ['desc'],
    );
    return sortedByDate;
  },
);
export const fetchTeamProsList = createAsyncThunk(
  'member/teamsProsList',
  async (id: string) => {
    const response = await services.getMemberTeamsList(
      `?rootServiceIdForProviders=${id}`,
    );
    return response.data?.data;
  },
);
export const fetchServicesProsList = createAsyncThunk(
  'member/servicesProsList',
  async (id: string) => {
    const response = await services.getMemberTeamsList(
      `?serviceIdForProviders=${id}`,
    );
    return response.data?.data;
  },
);

export const fetchProviderSchedule = createAsyncThunk(
  'member/providerSchedule',
  async (id: string) => {
    const response = await services.getSchedule(id);
    return response.data?.data;
  },
);

export const fetchTimeSlots = createAsyncThunk(
  'member/fetchTimeSlots',
  async (params: any) => {
    const response = await services.getTimeSlots(
      params.servicesId,
      params.date,
      params.providerId,
    );
    return response.data?.data;
  },
);

const searchSlice = createSlice({
  name: 'addAppointment',
  initialState,
  reducers: {
    setProviderList: (state, {payload}: PayloadAction<any[]>) => {
      state.providersList = payload;
    },
    setTeamsList: (state, {payload}: PayloadAction<any[]>) => {
      state.teamsList = payload;
    },
    setServicesList: (state, {payload}: PayloadAction<any[]>) => {
      state.servicesList = payload;
    },
    setRecentAppointmentsList: (state, {payload}: PayloadAction<any[]>) => {
      state.recentAppointmentsList = payload;
    },
    setAppointmentProvider: (
      state,
      {payload}: PayloadAction<AddAppointmentProviderType>,
    ) => {
      state.appointmentProvider = payload;
      state.addAppointment.providerId = payload.id;
      state.addAppointment.address = payload.address;
    },
    updateSelectedServices: (state, {payload}: PayloadAction<any>) => {
      const query = e => e.service.id == payload.service.id;

      const exists = state.selectedServices.find(query);

      if (exists) {
        state.selectedServices = state.selectedServices?.filter(
          e => e.service.id != payload.service.id,
        );
      } else {
        state.selectedServices.push(payload);
      }

      state.addAppointment.services = state.selectedServices.map(e => {
        return {
          id: e.service.id,
          price: e.service.price,
          duration: e.service.duration,
          peakPrice: '0',
        } as AddAppointmentServiceType;
      });

      const totalHours = state.addAppointment.services.reduce(
        (accumulator, currentValue) => {
          return Number(accumulator) + Number(currentValue.duration);
        },
        0,
      );

      const totalCost = state.addAppointment.services.reduce(
        (accumulator, currentValue) => {
          return Number(accumulator) + Number(currentValue.price);
        },
        0,
      );

      state.addAppointment.totalDuration = (totalHours as unknown) as string;
      state.addAppointment.totalPrice = (totalCost as unknown) as string;
    },
    setSelectedServices: (state, {payload}: PayloadAction<any>) => {
      state.selectedServices = payload;

      state.addAppointment.services = payload.map(e => {
        return {
          id: e.service.id,
          price: e.service.price,
          duration: e.service.duration,
          peakPrice: '0',
        } as AddAppointmentServiceType;
      });

      const totalHours = state.addAppointment.services.reduce(
        (accumulator, currentValue) => {
          return Number(accumulator) + Number(currentValue.duration);
        },
        0,
      );

      const totalCost = state.addAppointment.services.reduce(
        (accumulator, currentValue) => {
          return Number(accumulator) + Number(currentValue.price);
        },
        0,
      );

      state.addAppointment.totalDuration = (totalHours as unknown) as string;
      state.addAppointment.totalPrice = (totalCost as unknown) as string;
    },
    resetSelectedServices: state => {
      state.selectedServices = [];
    },
    setAppointmentDate: (state, {payload}: PayloadAction<string>) => {
      state.addAppointment.date = payload;
      state.addAppointment.startTime = initialState.addAppointment.startTime;
      state.addAppointment.endTime = initialState.addAppointment.endTime;
    },
    setAppointmentTimeDate: (
      state,
      {payload}: PayloadAction<{startTime: string; endTime: string}>,
    ) => {
      state.addAppointment.startTime = payload.startTime;
      state.addAppointment.endTime = payload.endTime;
    },
    setAppointmentId: (state, {payload}: PayloadAction<number>) => {
      state.addAppointment.appointmentId = payload;
    },
    setAppointmentCreatedAt: (state, {payload}: PayloadAction<any>) => {
      state.addAppointment.createdAt = payload;
    },
    resetAddAppointment: state => {
      state.addAppointment = initialState.addAppointment;
      state.selectedServices = initialState.selectedServices;
      state.appointmentProvider = undefined;
      state.timeSlots = initialState.timeSlots;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProvidersList.pending, (state, action) => {
        state.providerListLoading = true;
      })
      .addCase(fetchProvidersList.fulfilled, (state, action) => {
        state.providerListLoading = false;
        state.providersList = action.payload;
      })
      .addCase(fetchProvidersList.rejected, (state, action) => {
        state.providerListLoading = false;
        state.error = action.error;
      })
      .addCase(fetchTeamsList.pending, (state, action) => {
        state.teamsListLoading = true;
      })
      .addCase(fetchTeamsList.fulfilled, (state, action) => {
        state.teamsListLoading = false;
        state.teamsList = action.payload;
      })
      .addCase(fetchTeamsList.rejected, (state, action) => {
        state.teamsListLoading = false;
        state.error = action.error;
      })
      .addCase(fetchServicesList.pending, (state, action) => {
        state.servicesListLoading = true;
      })
      .addCase(fetchServicesList.fulfilled, (state, action) => {
        state.servicesListLoading = false;
        state.servicesList = action.payload;
      })
      .addCase(fetchServicesList.rejected, (state, action) => {
        state.servicesListLoading = false;
        state.error = action.error;
      })
      .addCase(fetchRecentAppointmentsList.pending, (state, action) => {
        state.recentAppointmentsListLoading = true;
      })
      .addCase(fetchRecentAppointmentsList.fulfilled, (state, action) => {
        state.recentAppointmentsListLoading = false;
        state.recentAppointmentsList = action.payload;
      })
      .addCase(fetchRecentAppointmentsList.rejected, (state, action) => {
        state.recentAppointmentsListLoading = false;
        state.error = action.error;
      })
      .addCase(fetchTeamProsList.fulfilled, (state, action) => {
        state.prosListLoading = false;
        state.teamsList[
          state.teamsList.findIndex(e => e.rootServiceId.id == action.meta.arg)
        ]['providersList'] = action.payload;
      })
      .addCase(fetchTeamProsList.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(fetchServicesProsList.fulfilled, (state, action) => {
        state.servicesList[
          state.servicesList.findIndex(e => e.serviceId.id == action.meta.arg)
        ]['providersList'] = action.payload;
      })
      .addCase(fetchServicesProsList.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(fetchTimeSlots.fulfilled, (state, action) => {
        state.timeSlots = action.payload;
      })
      .addCase(fetchTimeSlots.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(fetchProviderSchedule.fulfilled, (state, action) => {
        const active = action.payload?.find(e => e.isActive);
        state.proServicesList = active?.services.filter(e => e.isPaused == 0);
        state.providerSchedule = active;
        state.addAppointment.scheduleId = active?.id;
        state.addAppointment.scheduleType = active?.type;
        state.addAppointment.isReservationFee = active?.isReservationFee;
        state.addAppointment.reservationFee = active?.reservationFee;
      })
      .addCase(fetchProviderSchedule.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const {
  setProviderList,
  setTeamsList,
  setServicesList,
  setRecentAppointmentsList,
  setAppointmentProvider,
  updateSelectedServices,
  resetSelectedServices,
  setAppointmentDate,
  setAppointmentTimeDate,
  resetAddAppointment,
  setAppointmentId,
  setAppointmentCreatedAt,
  setSelectedServices,
} = searchSlice.actions;
export default searchSlice.reducer;

export const getAddAppointment = (state: RootState) =>
  state.addAppointment.addAppointment;

export const getProvidersList = (state: RootState) =>
  state.addAppointment.providersList;
export const getTeamList = (state: RootState) => state.addAppointment.teamsList;
export const getServicesList = (state: RootState) =>
  state.addAppointment.servicesList;
export const getRecentAppointmentsList = (state: RootState) =>
  state.addAppointment.recentAppointmentsList;
export const getProsList = (state: RootState) => state.addAppointment.prosList;

export const getProviderListLoading = (state: RootState) =>
  state.addAppointment.providerListLoading;
export const getTeamsListLoading = (state: RootState) =>
  state.addAppointment.teamsListLoading;
export const getServicesListLoading = (state: RootState) =>
  state.addAppointment.servicesListLoading;
export const getRecentAppointmentListLoading = (state: RootState) =>
  state.addAppointment.recentAppointmentsListLoading;

export const getAppointmentProvider = (state: RootState) =>
  state.addAppointment.appointmentProvider;
export const getProviderServices = (state: RootState) =>
  state.addAppointment.proServicesList;

export const getSelectedServices = (state: RootState) =>
  state.addAppointment.selectedServices;

export const getProviderSchedule = (state: RootState) =>
  state.addAppointment.providerSchedule;

export const getTimeSlots = (state: RootState) => {
  let list = [...state.addAppointment.timeSlots];

  let addAppointment = state.addAppointment.addAppointment;

  if (list.length != 0 && addAppointment.appointmentId != 0) {
    const found = list.find(e => e.startTime == addAppointment.startTime);

    if (found == null) {
      list.unshift({
        startTime: addAppointment.startTime,
        endTime: addAppointment.endTime,
      });
    }
  }

  return list;
};
