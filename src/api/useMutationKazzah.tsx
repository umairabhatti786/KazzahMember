import {useMutation} from 'react-query';
import {client} from './client';

export function useMutationKazzah(url: string, token?: string) {
  return useMutation((data: any) => {
    return client.post(url, data, {
      transformRequest: (data, headers) => {
        return data;
      },
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  });
}
