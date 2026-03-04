import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountService } from '@/services/account.service';
import type { CreateAccountRequest } from '@/types/account';
import type { ApiError } from '@/types/api';
import { QUERY_KEYS } from '@/utils/constants';
import toast from 'react-hot-toast';

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAccountRequest) => accountService.createAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.accounts });
      toast.success('Account created successfully!');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Failed to create account');
    },
  });
}
