import { useQuery } from '@tanstack/react-query';
import { transactionService } from '@/services/transaction.service';
import { QUERY_KEYS } from '@/utils/constants';

export function useTransactionHistory(accountId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.transactions(accountId),
    queryFn: () => transactionService.getHistory(accountId),
    enabled: !!accountId,
  });
}
