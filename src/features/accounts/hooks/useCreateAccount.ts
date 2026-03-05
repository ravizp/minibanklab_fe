import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountService } from '@/services/account.service';
import type { ApiError } from '@/types/api';
import { QUERY_KEYS } from '@/utils/constants';
import toast from 'react-hot-toast';

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => accountService.createAccount(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.accounts });
      toast.success('Account created successfully!');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Failed to create account');
    },
  });
}
