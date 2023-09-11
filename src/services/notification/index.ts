import {client, clientJson} from 'api/client';
import URLS from 'api/Urls';
import {getFormData} from 'services/common';

const PostNotification = async (token: string, data: any) => {
  try {
    const response = await client.post(URLS.PUSH_NOTIFICATION, data, {
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

const PostUserDetails = async (data: any) => {
  try {
    const formdata = getFormData(data);

    const response = await client.post(URLS.USER_DEVICES, formdata, {
      transformRequest: (data, headers) => {
        return data;
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

const SendNotification = async (data: any) => {
  try {
    const formdata = getFormData(data);

    const response = await client.post(URLS.NOTIFICATION, formdata, {
      transformRequest: (data, headers) => {
        return data;
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
const TriggerNotification = async ({
  trigger,
  modelId,
  channel,
  title,
  messageParams,
  data,
}: any) => {
  const body = {
    trigger: trigger,
    triggerType: 'provider-triggers',
    modelType: 'provider',
    modelId: modelId,
    channel: channel,
    title: title,
    messageParams: messageParams,
    data,
  };

  return clientJson.post(URLS.TRIGGER_NOTIFICATION, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export {
  PostNotification,
  PostUserDetails,
  SendNotification,
  TriggerNotification,
};
