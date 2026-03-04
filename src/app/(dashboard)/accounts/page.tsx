'use client';

import { useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { AccountCard } from '@/features/accounts/components/AccountCard';
import { CreateAccountModal } from '@/features/accounts/components/CreateAccountModal';
import { useAccounts } from '@/features/accounts/hooks/useAccounts';

export default function AccountsPage() {
  const { data: accounts, isLoading, error } = useAccounts();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Accounts</h1>
          <p className="text-slate-500 mt-1">Manage your bank accounts</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Account
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">
          Failed to load accounts. Please try again.
        </div>
      ) : accounts && accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Wallet className="h-16 w-16" />}
          title="No accounts yet"
          description="Create your first bank account to start managing your finances."
          action={
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Account
            </Button>
          }
        />
      )}

      <CreateAccountModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
}
