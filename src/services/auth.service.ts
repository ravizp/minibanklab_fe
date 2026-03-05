import { userApi } from './api';
import type { LoginRequest, RegisterRequest, LoginResponse, User, ProfileDetailResponse } from '@/types/auth';

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await userApi.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<User> {
    const response = await userApi.post<User>('/auth/register', data);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await userApi.get<User>('/auth/profile');
    return response.data;
  },

  async getProfileDetail(): Promise<ProfileDetailResponse> {
    const response = await userApi.get<ProfileDetailResponse>('/auth/profile/detail');
    return response.data;
  },
};
