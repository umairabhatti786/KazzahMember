import {combineReducers} from 'redux';
import authReducer from '../reducers/authReducer';

import categoryReducer from '../reducers/categoryReducer';
import searchReducer from '../reducers/searchReducer';
import mediaReducer from './mediaReducer';
import signUpReducer from './signUpReducer';
import addProReducer from './addProReducer';
import appointmentsReducer from './appoinmentReducer';
import contactsReducer from './contactReducer';

import addAppointmentReducer from './addAppointmentReducer';
import PaymentReducer from './PaymentReducer';
import configurationReducer from './configurationReducer';
import updateProfileReducer from './updateProfileReducer';
import providerReducer from './providerReducer';
import memberReducer from './memberReducer';
import chatReducer from './chatReducer';
import notificationsReducer from './notificationsReducer';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  appointments: appointmentsReducer,
  contacts: contactsReducer,
  auth: authReducer,
  category: categoryReducer,
  search: searchReducer,
  updateProfile: updateProfileReducer,
  media: mediaReducer,
  addPro: addProReducer,
  addAppointment: addAppointmentReducer,
  payment: PaymentReducer,
  configurations: configurationReducer,
  provider: providerReducer,
  member: memberReducer,
  chat: chatReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
