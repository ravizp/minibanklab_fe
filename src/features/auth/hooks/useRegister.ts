import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';
import type { RegisterRequest } from '@/types/auth';
import type { ApiError } from '@/types/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useRegister() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      login(response.token);
      toast.success('Account created successfully!');
      router.push('/dashboard');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Registration failed');
    },
  });
}
