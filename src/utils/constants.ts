export const QUERY_KEYS = {
  profile: ['profile'] as const,
  profileDetail: ['profile', 'detail'] as const,
  accounts: ['accounts'] as const,
  account: (id: string) => ['accounts', id] as const,
  balance: (id: string) => ['accounts', id, 'balance'] as const,
  transactions: (accountId: string) => ['transactions', accountId] as const,
} as const;
