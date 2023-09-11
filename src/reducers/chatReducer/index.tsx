import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import services from 'services';
import {RootState} from 'store';

export interface Provider {
  chatLoading: boolean;
  chatResponse: any[];
  selectedConnectionId: number;
  message: string;
  userType: string;
  error: any;
}

export const initialState: Provider = {
  chatLoading: false,
  chatResponse: [],
  selectedConnectionId: 0,
  userType: '',
  message: '',
  error: undefined,
};
export const fetchChat = createAsyncThunk('member/chat', async (id: any) => {
  const res = await services.getChat();
  return res?.data?.data;
});
const searchSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, {payload}: PayloadAction<any[]>) => {
      state.chatResponse = payload;
    },
    setSelectedConnectionId: (state, {payload}: PayloadAction<number>) => {
      state.selectedConnectionId = payload;
    },
    setEmptySelectedConnectionId: (state, {payload}: any) => {
      state.selectedConnectionId = initialState.selectedConnectionId;
    },
    setMessage: (state, {payload}: PayloadAction<string>) => {
      state.message = payload;
    },
    setUserType: (state, {payload}: PayloadAction<string>) => {
      state.userType = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchChat.pending, (state, action) => {
        state.chatLoading = true;
      })
      .addCase(fetchChat.fulfilled, (state, action) => {
        state.chatLoading = false;
        state.chatResponse = action.payload;
      })
      .addCase(fetchChat.rejected, (state, action) => {
        state.chatLoading = false;
        state.error = action.error;
      });
  },
});

export const {
  setChat,
  setSelectedConnectionId,
  setMessage,
  setUserType,
  setEmptySelectedConnectionId,
} = searchSlice.actions;
export default searchSlice.reducer;
export const getChat = (state: RootState) => state?.chat.chatResponse;

export const getSelectedConnectionId = (state: RootState) =>
  state?.chat.selectedConnectionId;

export const getMessage = (state: RootState) => state?.chat.message;
export const getUserType = (state: RootState) => state?.chat.userType;
