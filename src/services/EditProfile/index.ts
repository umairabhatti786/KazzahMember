import {client} from 'api/client';
import URLS from 'api/Urls';

const GetProfile = async (token: string) => {
  try {
    return await client.get(URLS.GET_PROFILE, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};
const UplaodProfilePhoto = async (token: string, data: any) => {
  try {
    return client.post(URLS.PROFILE_PHOTO, data, {
      transformRequest: (data, headers) => {
        return data;
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export {GetProfile, UplaodProfilePhoto};
