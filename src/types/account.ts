export interface Account {
  id: string;
  account_number: string;
  user_id: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface BalanceResponse {
  account_id: string;
  account_number: string;
  balance: number;
}
