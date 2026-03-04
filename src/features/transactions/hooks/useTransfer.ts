import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/services/transaction.service';
import type { TransferRequest } from '@/types/transaction';
import type { ApiError } from '@/types/api';
import { QUERY_KEYS } from '@/utils/constants';
import toast from 'react-hot-toast';

export function useTransfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransferRequest) => transactionService.transfer(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.accounts });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balance(variables.from_account_id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions(variables.from_account_id) });
      toast.success('Transfer successful!');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Transfer failed');
    },
  });
}
