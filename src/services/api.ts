import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { storage } from '@/utils/storage';
import { logger } from '@/lib/logger';
import type { ApiError } from '@/types/api';

const userApi = axios.create({
  baseURL: '/api/user',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

const accountApi = axios.create({
  baseURL: '/api/account',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

const transactionApi = axios.create({
  baseURL: '/api/transaction',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

function attachToken(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  (config as InternalAxiosRequestConfig & { metadata?: { startTime: number } }).metadata = {
    startTime: Date.now(),
  };
  return config;
}

function handleResponseSuccess(response: import('axios').AxiosResponse) {
  const config = response.config as InternalAxiosRequestConfig & { metadata?: { startTime: number } };
  const duration = config.metadata ? Date.now() - config.metadata.startTime : undefined;
  logger.request(
    response.config.method?.toUpperCase() ?? 'GET',
    response.config.url ?? '',
    response.status,
    duration,
  );
  return response;
}

function handleResponseError(error: AxiosError<ApiError>) {
  const config = error.config as (InternalAxiosRequestConfig & { metadata?: { startTime: number } }) | undefined;
  const duration = config?.metadata ? Date.now() - config.metadata.startTime : undefined;
  const status = error.response?.status;
  const url = error.config?.url ?? '';
  const method = error.config?.method?.toUpperCase() ?? 'GET';

  logger.request(method, url, status, duration);

  if (status === 401) {
    storage.removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  const responseData = error.response?.data;
  const apiError: ApiError =
    responseData && typeof responseData === 'object' && 'message' in responseData
      ? responseData
      : {
          error: 'NETWORK_ERROR',
          message: error.message || 'An unexpected error occurred',
        };

  return Promise.reject(apiError);
}

[userApi, accountApi, transactionApi].forEach((instance) => {
  instance.interceptors.request.use(attachToken, (error) => Promise.reject(error));
  instance.interceptors.response.use(handleResponseSuccess, handleResponseError);
});

export { userApi, accountApi, transactionApi };
