import {client} from 'api/client';
import URLS from 'api/Urls';
import axios, {Axios} from 'axios';

const CreateProvider = async (token: string, data: any) => {
  try {
    const response = await (
      await client.post(URLS.CREATE_PROVIDER, data, {
        transformRequest: (data, headers) => {
          return data;
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
    ).data;

    return response;
  } catch (error) {
    const statusCode = error.response.status; // 400
    const statusText = error.response.statusText; // Bad Request
    const message = error.response.data.message; // id should not be empty

    return error.response;
  }
};

const CreateMember = async (token: string, data: any) => {
  try {
    const response = await (
      await client.post(URLS.CREATE_MEMBER, data, {
        transformRequest: (data, headers) => {
          return data;
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
    ).data;

    return response;
  } catch (error) {
    const statusCode = error.response.status; // 400
    const statusText = error.response.statusText; // Bad Request
    const message = error.response.data.message; // id should not be empty

    return error.response;
  }
};

const CancelToken = axios.CancelToken;
let controllerRef;

const GetTeam = async (token: string, id: any) => {
  return client.get(`${URLS.MEMBER_TEAM}${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
const GetTeamByProId = async (token: string, id: any, clientId: any) => {
  try {
    return await client.get(`${URLS.MEMBER_TEAM}${id}&clientId=${clientId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};
export {CreateProvider, GetTeam, GetTeamByProId, CreateMember};
