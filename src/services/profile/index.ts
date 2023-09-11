import {client} from 'api/client';
import URLS from 'api/Urls';
import {getToken} from 'core/Auth/utils';
import {logIn, setProfile} from 'reducers/authReducer';
import {GetProfile} from 'services/ProviderProfile';
import store from 'store';
import messaging from '@react-native-firebase/messaging';

const UpdateProfile = async (token: string, data: string) => {
  try {
    return await client.put(URLS.UPDATE_PROFILE, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        // Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};
const ResendCode = async () => {
  return client.get(URLS.RESEND_CODE);
};
const VerifyCode = async (data: any) => {
  return client.post(URLS.VERIFY_CODE, data, {
    transformRequest: (data, headers) => {
      return data;
    },
  });
};

const RefreshUser = async () => {
  const res = await GetProfile();
  let profile = res.data.data as any;

  try {
    profile['token'] = getToken()?.access;
    store.dispatch(setProfile(profile));
  } catch (error) {}
};
const Logout = async () => {
  const token = await messaging().getToken();
  return client.get(`${URLS.LOGOUT}${token}`);
};

export {UpdateProfile, ResendCode, VerifyCode, RefreshUser, Logout};
