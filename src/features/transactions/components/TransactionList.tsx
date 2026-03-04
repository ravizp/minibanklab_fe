'use client';

import { ArrowDownLeft, ArrowUpRight, ArrowDownCircle } from 'lucide-react';
import type { Transaction } from '@/types/transaction';
import { formatCurrency, formatDate, capitalize } from '@/utils/format';

interface TransactionListProps {
  transactions: Transaction[];
}

function getTransactionIcon(type: string) {
  switch (type.toLowerCase()) {
    case 'topup':
      return <ArrowDownLeft className="h-5 w-5 text-green-600" />;
    case 'transfer_in':
      return <ArrowDownCircle className="h-5 w-5 text-green-600" />;
    case 'transfer_out':
      return <ArrowUpRight className="h-5 w-5 text-red-600" />;
    default:
      return <ArrowUpRight className="h-5 w-5 text-slate-400" />;
  }
}

function getAmountColor(type: string) {
  if (['topup', 'transfer_in'].includes(type.toLowerCase())) return 'text-green-600';
  if (['transfer_out'].includes(type.toLowerCase())) return 'text-red-600';
  return 'text-slate-900';
}

function getAmountPrefix(type: string) {
  if (['topup', 'transfer_in'].includes(type.toLowerCase())) return '+';
  if (['transfer_out'].includes(type.toLowerCase())) return '-';
  return '';
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
            <p className="text-sm font-medium text-slate-900">{capitalize(tx.type.replace('_', ' '))}</p>
            <p className="text-xs text-slate-500 truncate">{tx.description || tx.reference}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className={`text-sm font-semibold ${getAmountColor(tx.type)}`}>
              {getAmountPrefix(tx.type)}
              {formatCurrency(tx.amount, tx.currency)}
            </p>
            <p className="text-xs text-slate-400">{formatDate(tx.created_at)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
