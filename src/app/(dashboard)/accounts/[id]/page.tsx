'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Wallet, Clock, Hash } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAccountDetail } from '@/features/accounts/hooks/useAccountDetail';
import { formatCurrency, formatDate, formatAccountNumber } from '@/utils/format';

export default function AccountDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: account, isLoading, error } = useAccountDetail(id);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (error || !account) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center py-12">
          <p className="text-red-500 mb-4">Failed to load account details</p>
          <Link href="/accounts">
            <Button variant="outline">Back to Accounts</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/accounts" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Account Details</h1>
          <p className="text-slate-500 text-sm">{formatAccountNumber(account.account_number)}</p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-blue-100 text-sm">Bank Account</p>
            <p className="text-white font-mono">{formatAccountNumber(account.account_number)}</p>
          </div>
        </div>
        <p className="text-blue-100 text-sm">Current Balance</p>
        <p className="text-4xl font-bold text-white mt-1">{formatCurrency(account.balance)}</p>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Information</h3>
        <div className="space-y-3">
          <InfoRow icon={<Hash className="h-4 w-4" />} label="Account ID" value={account.id} />
          <InfoRow icon={<Hash className="h-4 w-4" />} label="Account Number" value={account.account_number} />
          <InfoRow icon={<Clock className="h-4 w-4" />} label="Created" value={formatDate(account.created_at)} />
        </div>
      </Card>

      <div className="flex gap-3">
        <Link href={`/accounts/${id}/balance`} className="flex-1">
          <Button variant="outline" className="w-full">Check Balance</Button>
        </Link>
        <Link href={`/transactions/${id}`} className="flex-1">
          <Button variant="outline" className="w-full">View History</Button>
        </Link>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
      <div className="flex items-center gap-3 text-slate-500">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-medium text-slate-900">{value}</span>
    </div>
  );
}
