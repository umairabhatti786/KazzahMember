import {useMutation} from 'react-query';
import {client} from './client';

export function useMutationKazzahPut(url: string, token?: string) {
  return useMutation((data: any) => {
    return client.put(url, data, {
      // transformRequest: (data, headers) => {
      //   return data;
      // },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    });
  });
}
