export interface Transaction {
  id: string;
  account_id: string;
  type: string;
  amount: number;
  currency: string;
  reference: string;
  description: string;
  status: string;
  created_at: string;
}

export interface TopUpRequest {
  account_id: string;
  amount: number;
  description?: string;
}

export interface TransferRequest {
  from_account_id: string;
  to_account_id: string;
  amount: number;
  description?: string;
}

export interface TransactionResponse {
  message: string;
  transaction: Transaction;
}
