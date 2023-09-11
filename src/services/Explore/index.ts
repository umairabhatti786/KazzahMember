import {client, clientJson} from 'api/client';
import URLS from 'api/Urls';

const getExploreMedia = async (token: string) => {
  try {
    const response = await client.get(URLS.GET_EXPLORE_MEDIA, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
const getAllMedia = async (token: string) => {
  try {
    const response = await client.get(URLS.GET_ALL_MEDIA);

    return response;
  } catch (error) {
    return error.response;
  }
};

const getExploreFavouriteMedia = async (token: string) => {
  try {
    const response = await client.get(URLS.GET_EXPLORE_FAVOUTRITE_MEDIA, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

const createMedia = async (token: string, body: any) => {
  try {
    const response = await client.post(URLS.MEDIA, body, {
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

const searchMedia = async (token: string, body: any) => {
  try {
    const response = await client.post(URLS.SEARCH_EXPLORE_MEDIA, body, {
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

const addMediaToFavourite = async (token: string, body: any) => {
  try {
    const response = await client.post(URLS.ADD_MEDIA_TO_FAVOURITE, body, {
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

// const deleteMedia = async (token: string, id: any) => {
//   try {
//     const response = await client.delete(URLS.DEL_MEDIA, body, {
//       transformRequest: (data, headers) => {
//         return data;
//       },
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     });

//     return response;
//   } catch (error) {
//     return error.response;
//   }
// };

const deleteMedia = async (token: string, id: any) => {
  try {
    const url = `${URLS.DEL_MEDIA}${id}`;

    return await client.delete(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export {
  getExploreMedia,
  getExploreFavouriteMedia,
  createMedia,
  searchMedia,
  addMediaToFavourite,
  getAllMedia,
  deleteMedia,
};
