import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { QUERY_KEYS } from '@/utils/constants';

export function useProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.profile,
    queryFn: () => authService.getProfile(),
  });
}

export function useProfileDetail() {
  return useQuery({
    queryKey: QUERY_KEYS.profileDetail,
    queryFn: () => authService.getProfileDetail(),
  });
}
