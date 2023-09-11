import {client, clientJson} from 'api/client';
import URLS from 'api/Urls';
import {AxiosRequestConfig} from 'axios';
import qs from 'qs';

const GetAllConnections = async () => {
  try {
    return await client.get(URLS.GET_CONNECTIONS_ALL);
  } catch (error) {
    return error.response;
  }
};
const GetProviderConnections = async (id: any) => {
  try {
    return await client.get(`${URLS.GET_PROVIDER_CONNECTIONS}/${id}`);
  } catch (error) {
    return error.response;
  }
};
const GetConnectionFav = async ( data: any) => {
  try {
    return await client.post(URLS.CONNECTIONS_FAV,data,{
      transformRequest: (data, headers) => {
        return data;
      },
      

    });
  } catch (error) {
    return error.response;
  }
};


const Disconnection = async (data: any) => {
  try {
    return await client.put(`${URLS.DISCONNECTION}`, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        // Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};
const DeleteTeamMember = async (serviceId: any, providerId: any) => {
  try {
    return await client.delete(
      `api/v1/memeber/team/service/${serviceId}/provider/${providerId}`,
    );
  } catch (error) {
    return error.response;
  }
};
const ConnectWith = async (data: any) => {
  try {
    return await client.put(`${URLS.CONNECT}`, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        // Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};

const SyncContacts = async (token: string, data: any) => {
  try {
    const response = await clientJson.post(URLS.SYNC_CONTACTS, data, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
const SyncContactsPro = async (token: string, data: any) => {
  try {
    const response = await clientJson.post(URLS.SYNC_CONTACTS_PROS, data, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export {
  GetAllConnections,
  GetConnectionFav,
  Disconnection,
  SyncContacts,
  ConnectWith,
  GetProviderConnections,
  DeleteTeamMember,
  SyncContactsPro,
};
