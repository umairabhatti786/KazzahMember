import {useQuery} from 'react-query';
import {client} from './client';

type TaskType = {};

export function useQueryKazzah(url: string, token?: string) {
  return useQuery<TaskType[]>('tasks', async () => {
    const {data} = await client.get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  });
}
