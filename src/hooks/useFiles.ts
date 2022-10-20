// Query to fetch the NFT details

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axiosClient';
import toast from 'react-hot-toast';
import DataType from '@interfaces/data';

// ----------------------- POST FILES -------------------

type PostData = {
  data: DataType;
  user: string;
};

const postFiles = async (data: PostData) => {
  const res = await axios.post('api/file', data).then(res => res.data);

  return res;
};

export const usePostFiles = (data: PostData) => {
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

type DeleteData = {
  doc: string;
  user: string;
};

const deleteFile = async (params: DeleteData) => {
  const res = await axios
    .delete('api/file?user=' + params.user + '&doc=' + params.doc)
    .then(res => res.data);

  return res;
};

export const useDeleteFile = (params: DeleteData) => {
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
  const res = await axios.get('api/file?user=' + user).then(res => res.data);

  return res;
};

export const useGetFiles = (user: string) => {
  return useQuery(['files'], () => getFiles(user), {
    refetchOnWindowFocus: false,
    enabled: false
  });
};
