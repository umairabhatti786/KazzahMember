import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import services from 'services';
import {RootState} from 'store';

export interface Provider {
  memberProfileLoading: boolean;
  memberId: any;
  memberProfile: [];
  error: any;
}

export const initialState: Provider = {
  memberProfileLoading: false,
  memberId: 0,
  memberProfile: [],
  error: undefined,
};
// export const fetchMemberProfile = createAsyncThunk(
//   'member/memberProfile',
//   async (id: any) => {
//       console.log("UserALlData",id)
//     const res = await services.getMemberProfile(id);
//     console.log("knkn",res?.data?.data)

//     return res?.data?.data;
//   },
// );
export const fetchMemberProfile = createAsyncThunk(
  'member/memberProfile',
  async (id: any, {rejectWithValue}) => {
    try {
      const res = await services.getMemberProfile(id);
      console.log('ResponseDataAll', res?.data?.data);

      return res?.data?.data;
    } catch (err) {
      console.log('errData', JSON.stringify(err.response.data, null, 2));
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
const searchSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setMemberProfile: (state, {payload}: PayloadAction<any>) => {
      state.memberProfile = payload;
    },
    setMemberId: (state, {payload}: PayloadAction<any>) => {
      console.log('PaulaodDaya');
      state.memberId = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchMemberProfile.pending, (state, action) => {
        state.memberProfileLoading = true;
      })
      .addCase(fetchMemberProfile.fulfilled, (state, action) => {
        state.memberProfileLoading = false;
        state.memberProfile = action.payload;
      })
      .addCase(fetchMemberProfile.rejected, (state, action) => {
        state.memberProfileLoading = false;
        state.error = action.error;
      });
  },
});

export const {setMemberProfile, setMemberId} = searchSlice.actions;
export default searchSlice.reducer;
export const getMemberProfile = (state: RootState) =>
  state?.member?.memberProfile;
export const getMemberProfileLoading = (state: RootState) =>
  state?.member?.memberProfileLoading;

export const getMemberId = (state: RootState) => state?.member?.memberId;
