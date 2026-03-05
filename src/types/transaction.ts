export interface Transaction {
  id: string;
  from_account_id: string | null;
  to_account_number: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  created_at: string;
}

export interface TopUpRequest {
  account_number: string;
  amount: string;
}

export interface TransferRequest {
  from_account_id: string;
  to_account_number: string;
  amount: string;
}

export interface TransactionResponse {
  id: string;
  from_account_id: string | null;
  to_account_number: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  created_at: string;
}
