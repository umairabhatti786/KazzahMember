import {client} from 'api/client';
import URLS from 'api/Urls';
import axios, {Axios} from 'axios';

export const getSuggestions = async (text: any) => {
  return client.get(`${URLS.SERVICES_SUGGESTIONS}${text}`);
};
