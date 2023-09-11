import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';

export interface Media {
  media: string;
  visibleMediaShare: boolean;
  visibleKazzahChatModal: boolean;
}

export const initialState: Media = {
  media: '',
  visibleMediaShare: false,
  visibleKazzahChatModal: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setMedia: (state, {payload}: PayloadAction<string>) => {
      state.media = payload;
    },
    setVisibleMediaShare: (state, {payload}: PayloadAction<boolean>) => {
      state.visibleMediaShare = payload;
    },
    setVisibleKazzahChatModal: (state, {payload}: PayloadAction<boolean>) => {
      state.visibleKazzahChatModal = payload;
    },
  },
});

export const {
  setMedia,
  setVisibleMediaShare,
  setVisibleKazzahChatModal,
} = searchSlice.actions;
export default searchSlice.reducer;

export const getMedia = (state: RootState) => state.media.media;
export const getVisibleMediaShare = (state: RootState) =>
  state.media.visibleMediaShare;
export const getVisibleKazzahChatModal = (state: RootState) =>
  state.media.visibleKazzahChatModal;
