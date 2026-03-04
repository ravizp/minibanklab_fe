'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { TopUpForm } from '@/features/transactions/components/TopUpForm';
import { useAccounts } from '@/features/accounts/hooks/useAccounts';
import { CircleDollarSign, Wallet } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function TopUpPage() {
  const { data: accounts, isLoading } = useAccounts();

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Top Up</h1>
        <p className="text-slate-500 mt-1">Add funds to your account</p>
      </div>

      {isLoading ? (
        <CardSkeleton />
      ) : accounts && accounts.length > 0 ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
                <CircleDollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Top Up Account</CardTitle>
                <CardDescription>Select an account and enter the amount</CardDescription>
              </div>
            </div>
          </CardHeader>
          <TopUpForm accounts={accounts} />
        </Card>
      ) : (
        <Card className="text-center py-12">
          <Wallet className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">You need an account to top up. Create one first.</p>
          <Link href="/accounts">
            <Button>Go to Accounts</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
