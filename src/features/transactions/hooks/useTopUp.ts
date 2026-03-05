import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/services/transaction.service';
import type { TopUpRequest } from '@/types/transaction';
import type { ApiError } from '@/types/api';
import { QUERY_KEYS } from '@/utils/constants';
import toast from 'react-hot-toast';

export function useTopUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TopUpRequest) => transactionService.topUp(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.accounts });
      toast.success('Top up successful!');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Top up failed');
    },
  });
}
