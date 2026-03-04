export interface Account {
  id: string;
  user_id: string;
  account_number: string;
  account_type: string;
  balance: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAccountRequest {
  account_type: string;
  currency: string;
}

export interface BalanceResponse {
  account_id: string;
  balance: number;
  currency: string;
}
