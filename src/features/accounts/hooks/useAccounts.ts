import { useQuery } from '@tanstack/react-query';
import { accountService } from '@/services/account.service';
import { QUERY_KEYS } from '@/utils/constants';

export function useAccounts() {
  return useQuery({
    queryKey: QUERY_KEYS.accounts,
    queryFn: () => accountService.getAccounts(),
  });
}
