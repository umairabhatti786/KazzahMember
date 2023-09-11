import {client} from 'api/client';
import URLS from 'api/Urls';
import SimpleToast from 'react-native-simple-toast';

const CreateRootSerivce = async (token: string, data: any) => {
  try {
    const res = await client.post(URLS.CREATE_ROOT_SERVICES, data, {
      transformRequest: (data, headers) => {
        return data;
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return res;
  } catch (error) {
    return error.response;
  }
};
const GetClientRootSerivce = async (token: string) => {
  try {
    const res = await client.get(URLS.GET_ROOT_SERVICES, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return res;
  } catch (error) {
    return error.response;
  }
};
const GetClientRootServiceById = async (token: string, id: any) => {
  try {
    const res = await client.get(
      `${URLS.GET_ROOT_SERVICES}?clientId=${id}&isProviderOnly=1`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );

    return res;
  } catch (error) {
    return error.response;
  }
};
const GetRootMemberServices = async (token: string, id: number) => {
  try {
    const res = await client.get(`${URLS.GET_ROOT_MEMBER_SERVICES}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return res;
  } catch (error) {
    return error.response;
  }
};

export {
  CreateRootSerivce,
  GetClientRootSerivce,
  GetRootMemberServices,
  GetClientRootServiceById,
};
