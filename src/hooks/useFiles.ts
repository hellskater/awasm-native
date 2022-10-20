// Query to fetch the NFT details

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

// ----------------------- POST FILES -------------------

const postFiles = async (data: any) => {
  const res = await axios
    .post('http://localhost:3000/api/file', data)
    .then(res => res.data);

  return res;
};

export const usePostFiles = (data: any) => {
  const queryClient = useQueryClient();
  return useMutation(() => postFiles(data), {
    onError(err: any) {
      toast.error(err.message);
    },
    async onSuccess() {
      const newData = await getFiles(data.user);
      queryClient.setQueryData(['files'], newData);
      toast.success('Saved Successfully');
    }
  });
};

// ----------------------- DELETE FILE -------------------

const deleteFile = async (params: any) => {
  const res = await axios
    .delete(
      'http://localhost:3000/api/file?user=' +
        params.user +
        '&doc=' +
        params.doc
    )
    .then(res => res.data);

  return res;
};

export const useDeleteFile = (params: any) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteFile(params), {
    onError(err: any) {
      toast.error(err.message);
    },
    async onSuccess() {
      const newData = await getFiles(params.user);
      queryClient.setQueryData(['files'], newData);
      toast.success('Deleted Successfully');
    }
  });
};

// ----------------------- GET FILES -------------------

const getFiles = async (user: string) => {
  const res = await axios
    .get('http://localhost:3000/api/file?user=' + user)
    .then(res => res.data);

  return res;
};

export const useGetFiles = (user: string) => {
  return useQuery(['files'], () => getFiles(user), {
    refetchOnWindowFocus: false,
    enabled: false
  });
};
