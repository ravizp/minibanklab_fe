import { userApi } from './api';
import type { LoginRequest, RegisterRequest, AuthResponse, User, UserDetail } from '@/types/auth';

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await userApi.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await userApi.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await userApi.get<User>('/auth/profile');
    return response.data;
  },

  async getProfileDetail(): Promise<UserDetail> {
    const response = await userApi.get<UserDetail>('/auth/profile/detail');
    return response.data;
  },
};
