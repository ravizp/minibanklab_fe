'use client';

import Link from 'next/link';
import { Wallet, ArrowRight } from 'lucide-react';
import type { Account } from '@/types/account';
import { formatCurrency, formatAccountNumber, capitalize } from '@/utils/format';

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Wallet className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">{capitalize(account.account_type)} Account</p>
            <p className="text-xs text-slate-500 font-mono">{formatAccountNumber(account.account_number)}</p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            account.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {capitalize(account.status)}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-slate-500">Balance</p>
        <p className="text-2xl font-bold text-slate-900">{formatCurrency(account.balance, account.currency)}</p>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/accounts/${account.id}`}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
        >
          Details <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={`/transactions/${account.id}`}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          History
        </Link>
      </div>
    </div>
  );
}
