import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useAddAccount = (onSuccess, onError) => {
  const requestFn = async data => {
    try {
      const response = await api.post('/add.php', data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError | Error | any;
      console.error('API Error:', error);
      throw new Error(
        error.response?.data?.message ||
          `Error: ${error.message || 'Unknown error occurred'}`
      );
    }
  };

  const mutation = useMutation({
    mutationFn: requestFn,
    onSuccess: data => {
      console.log('Account added successfully:', data);
      if (onSuccess) onSuccess(data);
    },
    onError: error => {
      console.error('Error adding account:', error);
      if (onError) onError(error);
    },
  });
  return mutation;
};

export const useGetBankList = (options = {}) => {
  const queryKey = ['bankList'];

  const fetchBankList = async () => {
    try {
      const response = await api.get('/get_bank_list_paystack.php');

      return response.data.response.data;
    } catch (err) {
      const error = err as AxiosError | Error | any;
      console.error('API Error:', error);
      throw new Error(
        error.response?.data?.message ||
          `Error: ${error.message || 'Failed to fetch bank list'}`
      );
    }
  };

  const query = useQuery({
    queryKey,
    queryFn: fetchBankList,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    ...options,
  });
  return query;
};
