import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import type { RegisterRequest } from '@/types/auth';
import type { ApiError } from '@/types/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: () => {
      toast.success('Account created! Please sign in.');
      router.push('/login');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Registration failed');
    },
  });
}
