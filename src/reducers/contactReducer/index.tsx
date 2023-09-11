import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import services from 'services';
import _ from 'lodash';

export interface SelectedContactDetails {
  client_team_id: any;
  firstName: string;
  lastName: string;
  mobileNo: string;
  fullNumber: string;
  serviceId: any;
  image: any;
  latitude: any;
  longitude: any;
}
export interface Contacts {
  addContactResponse: any[];
  selectedContactDetails: SelectedContactDetails;
  addContactLoading: boolean;
  selectedContactIndex: any;

  memberSerivceList: any[];
  memberSerivceListLoading: boolean;

  allContactsList: any[];
  allContactsListLoading: boolean;

  addProResponse: any[];
  addProResponseLoading: boolean;
  error: any;
}

export const initialState: Contacts = {
  addContactResponse: [],
  selectedContactDetails: {
    client_team_id: '',
    firstName: '',
    lastName: '',
    mobileNo: '',
    fullNumber: '',
    serviceId: '',
    image: '',
    latitude: '',
    longitude: '',
  },
  addContactLoading: false,
  selectedContactIndex: -1,
  allContactsList: [],
  allContactsListLoading: true,

  addProResponse: [],
  addProResponseLoading: false,

  memberSerivceList: [],
  memberSerivceListLoading: false,
  error: undefined,
};

export const addContact = createAsyncThunk(
  'member/addContact',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await services.createContact(data);
      return response.data?.data;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
export const addProContact = createAsyncThunk(
  'member/addProContact',
  async (data: any, {rejectWithValue}) => {
    try {
      const response = await services.createPro(data);
      return response.data?.data;
    } catch (err) {
      // console.log('err', err.response.data);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.data?.error);
    }
  },
);

export const fetchContactsList = createAsyncThunk(
  'member/fetchContactsList',
  async (params: any) => {
    const {filter} = params;

    const response = await services.getContactsList(
      filter == 'isFav' ? `all&isFav=1` : filter,
    );
    const sortedContacts = _.orderBy(
      response.data?.data,
      item => item?.connection?.firstName?.toLowerCase(),
      ['asc'],
    );

    return sortedContacts;
  },
);
export const fetchMemberServiceList = createAsyncThunk(
  'member/fetchMemberServiceList',
  async (id: any) => {
    const response = await services.getMemberServices(id);
    const sortedList = _.orderBy(
      response.data?.data,
      item => item?.name?.toLowerCase(),
      ['asc'],
    );
    return sortedList;
  },
);
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setAddContactResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.addContactResponse = payload;
    },
    setSelectedContact: (state, {payload}: PayloadAction<any[]>) => {
      state.selectedContactDetails = payload;
    },

    setContactList: (state, {payload}: PayloadAction<any[]>) => {
      state.allContactsList = payload;
    },

    setMemberServiceList: (state, {payload}: PayloadAction<any[]>) => {
      state.memberSerivceList = payload;
    },

    setAddProResponse: (state, {payload}: PayloadAction<any[]>) => {
      state.addProResponse = payload;
    },
    setselectedContactIndex: (state, {payload}: PayloadAction<any[]>) => {
      state.selectedContactIndex = payload;
    },
  },

  extraReducers(builder) {
    builder
      ////////addcontact/////////////////
      .addCase(addContact.pending, (state, action) => {
        state.addContactLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.addContactLoading = false;
        state.addContactResponse = action.payload;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.addContactLoading = false;
        state.error = action.error;
      })
      ////////getcontactlist/////////////////
      .addCase(fetchContactsList.pending, (state, action) => {
        state.allContactsListLoading = true;
      })
      .addCase(fetchContactsList.fulfilled, (state, action) => {
        state.allContactsListLoading = false;
        state.allContactsList = action.payload;
      })
      .addCase(fetchContactsList.rejected, (state, action) => {
        state.allContactsListLoading = false;
        state.error = action.error;
      })
      ////////getservicememberlist/////////////////
      .addCase(fetchMemberServiceList.pending, (state, action) => {
        state.memberSerivceListLoading = true;
      })
      .addCase(fetchMemberServiceList.fulfilled, (state, action) => {
        state.memberSerivceListLoading = false;
        state.memberSerivceList = action.payload;
      })
      .addCase(fetchMemberServiceList.rejected, (state, action) => {
        state.memberSerivceListLoading = false;
        state.error = action.error;
      })
      ////////addpro/////////////////
      .addCase(addProContact.pending, (state, action) => {
        state.addProResponseLoading = true;
      })
      .addCase(addProContact.fulfilled, (state, action) => {
        state.addProResponseLoading = false;
        state.addProResponse = action.payload;
      })
      .addCase(addProContact.rejected, (state, action) => {
        state.addProResponseLoading = false;
        state.error = action;
      });
  },
});

export const {
  setAddContactResponse,
  setSelectedContact,
  setselectedContactIndex,
  setMemberServiceList,
} = contactsSlice.actions;
export default contactsSlice.reducer;

export const getAddContactsResponse = (state: RootState) =>
  state.contacts.addContactResponse;
export const getSelectContact = (state: RootState) =>
  state.contacts.selectedContactDetails;

export const getAllContactsList = (state: RootState) =>
  state.contacts.allContactsList;

export const getAllMemberServices = (state: RootState) =>
  state.contacts.memberSerivceList;

export const getAllMemberServicesloading = (state: RootState) =>
  state.contacts.memberSerivceListLoading;

export const getAddProResponse = (state: RootState) =>
  state.contacts.addProResponse;
export const getSelectedContactIndex = (state: RootState) =>
  state.contacts.selectedContactIndex;

export const getContactListLoading = (state: RootState) =>
  state.contacts.allContactsListLoading;
