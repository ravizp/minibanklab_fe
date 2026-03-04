'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useTopUp } from '../hooks/useTopUp';
import type { Account } from '@/types/account';
import { formatAccountNumber } from '@/utils/format';

interface TopUpFormProps {
  accounts: Account[];
  onSuccess?: () => void;
}

export function TopUpForm({ accounts, onSuccess }: TopUpFormProps) {
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const topUpMutation = useTopUp();

  const accountOptions = accounts.map((a) => ({
    value: a.id,
    label: `${formatAccountNumber(a.account_number)} (${a.currency})`,
  }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    topUpMutation.mutate(
      {
        account_id: accountId,
        amount: parseFloat(amount),
        description: description || undefined,
      },
      {
        onSuccess: () => {
          setAmount('');
          setDescription('');
          onSuccess?.();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Select
        label="Account"
        options={accountOptions}
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        placeholder="Select account"
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
        placeholder="e.g., Monthly savings"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" className="w-full" size="lg" isLoading={topUpMutation.isPending}>
        Top Up
      </Button>
    </form>
  );
}
