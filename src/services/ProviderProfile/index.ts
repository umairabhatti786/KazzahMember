import {client} from 'api/client';
import URLS from 'api/Urls';
import {AxiosRequestConfig} from 'axios';

const GetMemberProfile = async (token: string, id: string) => {
  try {
    return await client.get(`${URLS.GET_PROFILE}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};

const GetProfile = async () => {
  return client.get(`${URLS.GET_PROFILE}`);
};
const GetLastAppointments = async (id: string) => {
  try {
    return await client.get(`${URLS.GET_LASTAPPOINTMENT}/${id}`, {});
  } catch (error) {
    return error.response;
  }
};
const GetNextAppointments = async (id: string) => {
  try {
    return await client.get(`${URLS.GET_NEXT_APPOINTMENT}/${id}`, {});
  } catch (error) {
    return error.response;
  }
};

const GetProviderProfile = async (token: string, id: any) => {
  try {
    return await client.get(`${URLS.GET_PROVIDER}/${id}`);
  } catch (error) {
    return error.response;
  }
};
const GetProviderProfileConnection = async (token: string, id: any) => {
  try {
    return await client.get(`${URLS.GET_PROVIDER_CONNECTION}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export {
  GetMemberProfile,
  GetProfile,
  GetProviderProfile,
  GetProviderProfileConnection,
  GetLastAppointments,
  GetNextAppointments,
};
