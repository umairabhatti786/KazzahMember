import {configureStore, Action} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import rootReducer from '../reducers/rootReducer';
import Reactotron from '../../ReactotronConfig';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  enhancers: [Reactotron.createEnhancer()],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();

export default store;
