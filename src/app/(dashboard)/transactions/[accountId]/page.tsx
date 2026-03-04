'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Receipt } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { TransactionList } from '@/features/transactions/components/TransactionList';
import { useTransactionHistory } from '@/features/transactions/hooks/useTransactionHistory';
import { useAccountDetail } from '@/features/accounts/hooks/useAccountDetail';
import { formatAccountNumber } from '@/utils/format';

export default function TransactionHistoryPage({ params }: { params: Promise<{ accountId: string }> }) {
  const { accountId } = use(params);
  const { data: transactions, isLoading, error } = useTransactionHistory(accountId);
  const { data: account } = useAccountDetail(accountId);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={account ? `/accounts/${accountId}` : '/accounts'} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transaction History</h1>
          {account && (
            <p className="text-slate-500 text-sm">{formatAccountNumber(account.account_number)}</p>
          )}
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton rows={8} />
      ) : error ? (
        <Card className="text-center py-12">
          <p className="text-red-500">Failed to load transactions</p>
        </Card>
      ) : transactions && transactions.length > 0 ? (
        <TransactionList transactions={transactions} />
      ) : (
        <EmptyState
          icon={<Receipt className="h-16 w-16" />}
          title="No transactions yet"
          description="Transactions will appear here once you make your first top up or transfer."
        />
      )}
    </div>
  );
}
