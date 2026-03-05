'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useTransfer } from '../hooks/useTransfer';
import type { Account } from '@/types/account';
import { formatAccountNumber } from '@/utils/format';

interface TransferFormProps {
  accounts: Account[];
  onSuccess?: () => void;
}

export function TransferForm({ accounts, onSuccess }: TransferFormProps) {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountNumber, setToAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const transferMutation = useTransfer();

  const accountOptions = accounts.map((a) => ({
    value: a.id,
    label: formatAccountNumber(a.account_number),
  }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    transferMutation.mutate(
      {
        from_account_id: fromAccountId,
        to_account_number: toAccountNumber,
        amount,
      },
      {
        onSuccess: () => {
          setAmount('');
          setToAccountNumber('');
          onSuccess?.();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Select
        label="From Account"
        options={accountOptions}
        value={fromAccountId}
        onChange={(e) => setFromAccountId(e.target.value)}
        placeholder="Select source account"
        required
      />
      <Input
        label="To Account Number"
        type="text"
        placeholder="Destination account number"
        value={toAccountNumber}
        onChange={(e) => setToAccountNumber(e.target.value)}
        required
      />
      <Input
        label="Amount"
        type="text"
        inputMode="decimal"
        placeholder="e.g. 50000"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Button type="submit" className="w-full" size="lg" isLoading={transferMutation.isPending}>
        Send Transfer
      </Button>
    </form>
  );
}
