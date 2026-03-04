import { accountApi } from './api';
import type { Account, CreateAccountRequest, BalanceResponse } from '@/types/account';

export const accountService = {
  async getAccounts(): Promise<Account[]> {
    const response = await accountApi.get<Account[]>('/accounts');
    return response.data;
  },

  async createAccount(data: CreateAccountRequest): Promise<Account> {
    const response = await accountApi.post<Account>('/accounts', data);
    return response.data;
  },

  async getAccount(id: string): Promise<Account> {
    const response = await accountApi.get<Account>(`/accounts/${id}`);
    return response.data;
  },

  async getBalance(id: string): Promise<BalanceResponse> {
    const response = await accountApi.get<BalanceResponse>(`/accounts/${id}/balance`);
    return response.data;
  },
};
