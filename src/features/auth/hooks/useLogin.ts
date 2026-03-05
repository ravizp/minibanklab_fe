import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';
import type { LoginRequest } from '@/types/auth';
import type { ApiError } from '@/types/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      login(response.token);
      toast.success(`Welcome back, ${response.user.name}!`);
      router.push('/dashboard');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Login failed');
    },
  });
}
