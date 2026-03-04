import { useQuery } from '@tanstack/react-query';
import { accountService } from '@/services/account.service';
import { QUERY_KEYS } from '@/utils/constants';

export function useAccountDetail(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.account(id),
    queryFn: () => accountService.getAccount(id),
    enabled: !!id,
  });
}

export function useAccountBalance(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.balance(id),
    queryFn: () => accountService.getBalance(id),
    enabled: !!id,
  });
}
