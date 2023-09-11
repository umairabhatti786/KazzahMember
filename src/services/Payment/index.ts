import {client} from 'api/client';
import URLS from 'api/Urls';
import {getFormData} from 'services/common';

const GetCards = async (token: string) => {
  try {
    return await client.get(`${URLS.CARDS}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};

const PostPayment = async (token: string, data: any) => {
  try {
    return await client.post(`${URLS.PAY}`, data, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  } catch (error) {
    return error.response;
  }
};

const PostPaymentWithTip = async (token: string, data: any) => {
  try {
    return await client.post(`${URLS.PAYTip}`, data, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  } catch (error) {
    return error.response;
  }
};

export {GetCards, PostPayment, PostPaymentWithTip};
