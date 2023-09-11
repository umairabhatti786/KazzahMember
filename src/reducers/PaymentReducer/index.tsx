import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import services from 'services';
import {RootState} from 'store';
import _ from 'lodash';

export interface PaymentCardType {
  cardId: any;
  appointmentId: string;
  paymentType: 'af' | 'rf';
  tipValue: string;
  tip: string;
}
export interface Payment {
  paidPaymentLoading: boolean;
  unPaidPaymentLoading: boolean;
  unPaidPaymentCount: any;
  cardLoading: boolean;
  paidPayment: any[];
  selectedCard: PaymentCardType;
  paymentCard: any[];
  unPaidPayment: any[];

  payAppointmentFeeLoading: boolean;
  payAppointmentFeeResponse: any[];

  payAppointmentCashLoading: boolean;
  payAppointmentCashResponse: any[];

  error: any;
}

export const initialState: Payment = {
  paidPaymentLoading: false,
  unPaidPaymentLoading: false,
  unPaidPaymentCount: undefined,
  cardLoading: false,
  payAppointmentFeeLoading: false,
  payAppointmentFeeResponse: [],

  payAppointmentCashLoading: false,
  payAppointmentCashResponse: [],
  selectedCard: {
    cardId: '',
    appointmentId: '',
    tipValue: '',
    paymentType: 'af',
    tip: '',
  },
  paidPayment: [],
  paymentCard: [],
  unPaidPayment: [],
  error: undefined,
};

export const fetchPaidPayment = createAsyncThunk(
  'member/paidPayment',
  async () => {
    const response = await services.getPayment('?isPaid=1');

    const sortedByDate = _.orderBy(
      response.data?.data,
      item => item?.appointmentDate?.toLowerCase(),
      ['asc'],
    );
    return sortedByDate;
  },
);
export const fetchUnPaidPayment = createAsyncThunk(
  'member/unPaidPayment',
  async () => {
    const response = await services.getPayment('?isPaid=0,2');
    const filerData = response.data?.data.filter((e: any) => {
      return e.status == 'completed';
    });

    const sortedByDate = _.orderBy(
      filerData,
      item => item?.appointmentDate?.toLowerCase(),
      ['asc'],
    );
    return sortedByDate;
  },
);
export const fetchPaymentCard = createAsyncThunk(
  'member/PaymentCard',
  async () => {
    const response = await services.getCards();
    return response.data?.data;
  },
);
export const payAppointmentFee = createAsyncThunk(
  'member/payAppointmentFee',
  async (data: any) => {
    const response = await services.postPayment(data);
    return response.data;
  },
);

export const payAppointmentCash = createAsyncThunk(
  'member/payAppointmentCashFee',
  async (data: any) => {
    const response = await services.postPaymentCash(data);
    console.log('pay cash', response);

    return response.data;
  },
);

const searchSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaidPayment: (state, {payload}: PayloadAction<any[]>) => {
      state.paidPayment = payload;
    },

    setUnPaidPayment: (state, {payload}: PayloadAction<any[]>) => {
      state.unPaidPayment = payload;
    },

    setPaymentCard: (state, {payload}: PayloadAction<any[]>) => {
      state.paymentCard = payload;
    },

    setSelectedCard: (state, {payload}: PayloadAction<any[]>) => {
      state.selectedCard = payload;
    },
    setPostPaymentResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.payAppointmentFeeResponse = payload;
    },

    setPostPaymentResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.payAppointmentFeeResponse = payload;
    },
    setEmptyPaymentResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.payAppointmentFeeResponse = initialState.payAppointmentFeeResponse;
    },

    setPostPaymentCashResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.payAppointmentCashResponse = payload;
    },
    setEmptyPaymentCashResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.payAppointmentCashResponse =
        initialState.payAppointmentCashResponse;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPaidPayment.pending, (state, action) => {
        state.paidPaymentLoading = true;
      })
      .addCase(fetchPaidPayment.fulfilled, (state, action) => {
        state.paidPaymentLoading = false;
        state.paidPayment = action.payload;
      })
      .addCase(fetchPaidPayment.rejected, (state, action) => {
        state.paidPaymentLoading = false;
        state.error = action.error;
      })

      .addCase(fetchUnPaidPayment.pending, (state, action) => {
        state.unPaidPaymentLoading = true;
      })
      .addCase(fetchUnPaidPayment.fulfilled, (state, action) => {
        state.unPaidPaymentLoading = false;
        state.unPaidPayment = action.payload;
        state.unPaidPaymentCount = action.payload.length;
      })
      .addCase(fetchUnPaidPayment.rejected, (state, action) => {
        state.unPaidPaymentLoading = false;
        state.error = action.error;
      })

      .addCase(fetchPaymentCard.pending, (state, action) => {
        state.cardLoading = true;
      })
      .addCase(fetchPaymentCard.fulfilled, (state, action) => {
        state.cardLoading = false;
        state.paymentCard = action.payload;
      })
      .addCase(fetchPaymentCard.rejected, (state, action) => {
        state.cardLoading = false;
        state.error = action.error;
      })

      .addCase(payAppointmentFee.pending, (state, action) => {
        state.payAppointmentFeeLoading = true;
      })
      .addCase(payAppointmentFee.fulfilled, (state, action) => {
        state.payAppointmentFeeLoading = false;
        state.payAppointmentFeeResponse = action.payload;
      })
      .addCase(payAppointmentFee.rejected, (state, action) => {
        state.payAppointmentFeeLoading = false;
        state.error = action.error;
      })
      .addCase(payAppointmentCash.pending, (state, action) => {
        state.payAppointmentCashLoading = true;
      })
      .addCase(payAppointmentCash.fulfilled, (state, action) => {
        state.payAppointmentCashLoading = false;
        state.payAppointmentCashResponse = action.payload;
      })
      .addCase(payAppointmentCash.rejected, (state, action) => {
        state.payAppointmentCashLoading = false;

        console.log('error', action.error.message);
        state.error = action.error;
      });
  },
});

export const {
  setPaidPayment,
  setUnPaidPayment,
  setSelectedCard,
  setPostPaymentResponse,
  setPostPaymentCashResponse,
  setEmptyPaymentResponse,
  setEmptyPaymentCashResponse,
} = searchSlice.actions;
export default searchSlice.reducer;

export const getPaidPayment = (state: RootState) => state?.payment.paidPayment;
export const getPaidPaymentLoading = (state: RootState) =>
  state?.payment.paidPaymentLoading;
export const getUnPaidPaymentLoading = (state: RootState) =>
  state?.payment.unPaidPaymentLoading;
export const getPaymentCard = (state: RootState) => state?.payment.paymentCard;
export const getSelectedCard = (state: RootState) =>
  state?.payment.selectedCard;
export const getUnPaidPayment = (state: RootState) =>
  state?.payment.unPaidPayment;
export const getApponintmentFeeResponse = (state: RootState) =>
  state?.payment.payAppointmentFeeResponse;

export const getApponintmentCashFeeResponse = (state: RootState) =>
  state?.payment.payAppointmentCashResponse;

export const getApponintmentCashFeeLoading = (state: RootState) =>
  state?.payment.payAppointmentFeeLoading;
export const getUnpaidPaymentCount = (state: RootState) =>
  state?.payment.unPaidPaymentCount;
