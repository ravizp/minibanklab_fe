'use client';

import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import type { Transaction } from '@/types/transaction';
import { formatCurrency, formatDate } from '@/utils/format';

interface TransactionListProps {
  transactions: Transaction[];
}

function getTransactionIcon(type: string) {
  switch (type.toUpperCase()) {
    case 'TOPUP':
      return <ArrowDownLeft className="h-5 w-5 text-green-600" />;
    case 'TRANSFER':
      return <ArrowUpRight className="h-5 w-5 text-blue-600" />;
    default:
      return <ArrowUpRight className="h-5 w-5 text-slate-400" />;
  }
}

function getTransactionLabel(type: string) {
  switch (type.toUpperCase()) {
    case 'TOPUP':
      return 'Top Up';
    case 'TRANSFER':
      return 'Transfer';
    default:
      return type;
  }
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p className="text-sm">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
        >
          <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
            {getTransactionIcon(tx.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900">{getTransactionLabel(tx.type)}</p>
            <p className="text-xs text-slate-500 truncate">
              {tx.description || `To ${tx.to_account_number}`}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className={`text-sm font-semibold ${tx.status === 'SUCCESS' ? 'text-slate-900' : 'text-red-500'}`}>
              {formatCurrency(tx.amount)}
            </p>
            <p className="text-xs text-slate-400">{formatDate(tx.created_at)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
