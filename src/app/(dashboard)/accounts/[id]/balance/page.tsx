'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAccountBalance, useAccountDetail } from '@/features/accounts/hooks/useAccountDetail';
import { formatCurrency, formatAccountNumber } from '@/utils/format';

export default function BalancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: balance, isLoading, refetch, isFetching } = useAccountBalance(id);
  const { data: account } = useAccountDetail(id);

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/accounts/${id}`} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Balance</h1>
          {account && (
            <p className="text-slate-500 text-sm">{formatAccountNumber(account.account_number)}</p>
          )}
        </div>
      </div>

      <Card className="text-center py-8">
        <p className="text-sm text-slate-500 mb-2">Available Balance</p>
        <p className="text-4xl font-bold text-slate-900">
          {balance ? formatCurrency(balance.balance, balance.currency) : '—'}
        </p>
        <p className="text-sm text-slate-400 mt-2">{balance?.currency}</p>

        <Button
          variant="ghost"
          size="sm"
          className="mt-6"
          onClick={() => refetch()}
          isLoading={isFetching}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </Card>

      <div className="flex gap-3">
        <Link href="/topup" className="flex-1">
          <Button className="w-full">Top Up</Button>
        </Link>
        <Link href="/transfer" className="flex-1">
          <Button variant="outline" className="w-full">Transfer</Button>
        </Link>
      </div>
    </div>
  );
}
