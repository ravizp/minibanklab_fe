'use client';

import { Wallet, TrendingUp, ArrowUpDown, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { AccountCard } from '@/features/accounts/components/AccountCard';
import { CreateAccountModal } from '@/features/accounts/components/CreateAccountModal';
import { useAccounts } from '@/features/accounts/hooks/useAccounts';
import { useProfile } from '@/features/auth/hooks/useProfile';
import { formatCurrency } from '@/utils/format';
import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: accounts, isLoading: accountsLoading } = useAccounts();
  const { data: profile } = useProfile();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const totalBalance = accounts?.reduce((sum, acc) => sum + Number(acc.balance), 0) ?? 0;
  const totalAccounts = accounts?.length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Here&apos;s an overview of your finances{profile ? `, ${profile.name.split(' ')[0]}` : ''}.
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Account
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
          </div>
          <p className="text-blue-100 text-sm">Total Balance</p>
          <p className="text-3xl font-bold text-white mt-1">{formatCurrency(totalBalance)}</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <p className="text-slate-500 text-sm">Total Accounts</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{totalAccounts}</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <ArrowUpDown className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <p className="text-slate-500 text-sm">Quick Actions</p>
          <div className="flex gap-2 mt-3">
            <Link href="/topup">
              <Button size="sm" variant="outline">Top Up</Button>
            </Link>
            <Link href="/transfer">
              <Button size="sm" variant="outline">Transfer</Button>
            </Link>
          </div>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Your Accounts</h2>
          <Link href="/accounts" className="text-sm text-blue-600 font-medium hover:underline">
            View all
          </Link>
        </div>

        {accountsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : accounts && accounts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.slice(0, 6).map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <Wallet className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">No accounts yet. Create your first account to get started.</p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Account
            </Button>
          </Card>
        )}
      </div>

      <CreateAccountModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
}
