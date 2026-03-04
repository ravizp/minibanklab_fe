export const ACCOUNT_TYPES = [
  { value: 'savings', label: 'Savings' },
  { value: 'checking', label: 'Checking' },
] as const;

export const CURRENCIES = [
  { value: 'IDR', label: 'IDR - Indonesian Rupiah' },
  { value: 'USD', label: 'USD - US Dollar' },
] as const;

export const QUERY_KEYS = {
  profile: ['profile'] as const,
  profileDetail: ['profile', 'detail'] as const,
  accounts: ['accounts'] as const,
  account: (id: string) => ['accounts', id] as const,
  balance: (id: string) => ['accounts', id, 'balance'] as const,
  transactions: (accountId: string) => ['transactions', accountId] as const,
} as const;
