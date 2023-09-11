import {client} from 'api/client';
import URLS from 'api/Urls';

const GetSchedule = async (token: string, id: any) => {
  try {
    const res = await client.get(`${URLS.GET_SCHEDULE}/${id}`);

    return res;
  } catch (error) {
    return error.response;
  }
};

const GetVacations = async (id: any) =>
  client.get(`${URLS.GET_VACATIONS}/${id}`);

export {GetSchedule, GetVacations};
