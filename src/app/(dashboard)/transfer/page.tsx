'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { TransferForm } from '@/features/transactions/components/TransferForm';
import { useAccounts } from '@/features/accounts/hooks/useAccounts';
import { SendHorizontal, Wallet } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function TransferPage() {
  const { data: accounts, isLoading } = useAccounts();

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Transfer</h1>
        <p className="text-slate-500 mt-1">Send money to another account</p>
      </div>

      {isLoading ? (
        <CardSkeleton />
      ) : accounts && accounts.length > 0 ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <SendHorizontal className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Transfer Funds</CardTitle>
                <CardDescription>Select source account and enter destination</CardDescription>
              </div>
            </div>
          </CardHeader>
          <TransferForm accounts={accounts} />
        </Card>
      ) : (
        <Card className="text-center py-12">
          <Wallet className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">You need an account to transfer. Create one first.</p>
          <Link href="/accounts">
            <Button>Go to Accounts</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
