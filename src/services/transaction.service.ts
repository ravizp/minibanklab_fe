import { transactionApi } from './api';
import type { Transaction, TopUpRequest, TransferRequest, TransactionResponse } from '@/types/transaction';

export const transactionService = {
  async getHistory(accountId: string): Promise<Transaction[]> {
    const response = await transactionApi.get<Transaction[]>(`/transactions/history/${accountId}`);
    return response.data;
  },

  async topUp(data: TopUpRequest): Promise<TransactionResponse> {
    const response = await transactionApi.post<TransactionResponse>('/transactions/topup', data);
    return response.data;
  },

  async transfer(data: TransferRequest): Promise<TransactionResponse> {
    const response = await transactionApi.post<TransactionResponse>('/transactions/transfer', data);
    return response.data;
  },
};
