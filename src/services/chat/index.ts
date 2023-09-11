import {client} from 'api/client';
import URLS from 'api/Urls';
import axios from 'axios';
import {getFormData} from 'services/common';

export const PostChat = async (token: string, data: any) => {
  try {
    const formdata = getFormData(data);

    const response = await client.post(URLS.CHATS, formdata, {
      transformRequest: (data, headers) => {
        return data;
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
export const PostFile = async (data: any) => {
  try {
    const response = await axios.post(
      'https://sit.kazzah.co.uk/api/v1/image',
      data,
      {
        transformRequest: (data, headers) => {
          return data;
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'json',
      },
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

export const GetChat = async (token: string) => {
  try {
    const response = await client.get(URLS.CHAT, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const DeleteChat = async (token: string, collec: any) => {
  try {
    return await client.delete(`${URLS.DEL_CHAT}?group=${collec}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};
