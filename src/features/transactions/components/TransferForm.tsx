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
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const transferMutation = useTransfer();

  const accountOptions = accounts.map((a) => ({
    value: a.id,
    label: `${formatAccountNumber(a.account_number)} (${a.currency})`,
  }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    transferMutation.mutate(
      {
        from_account_id: fromAccountId,
        to_account_id: toAccountId,
        amount: parseFloat(amount),
        description: description || undefined,
      },
      {
        onSuccess: () => {
          setAmount('');
          setDescription('');
          setToAccountId('');
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
        label="To Account ID"
        type="text"
        placeholder="Destination account ID"
        value={toAccountId}
        onChange={(e) => setToAccountId(e.target.value)}
        required
      />
      <Input
        label="Amount"
        type="number"
        placeholder="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="1"
        step="any"
        required
      />
      <Input
        label="Description (optional)"
        type="text"
        placeholder="e.g., Rent payment"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" className="w-full" size="lg" isLoading={transferMutation.isPending}>
        Send Transfer
      </Button>
    </form>
  );
}
