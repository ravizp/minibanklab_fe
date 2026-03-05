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
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const topUpMutation = useTopUp();

  const accountOptions = accounts.map((a) => ({
    value: a.account_number,
    label: formatAccountNumber(a.account_number),
  }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    topUpMutation.mutate(
      { account_number: accountNumber, amount },
      {
        onSuccess: () => {
          setAmount('');
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
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        placeholder="Select account"
        required
      />
      <Input
        label="Amount"
        type="text"
        inputMode="decimal"
        placeholder="e.g. 100000"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Button type="submit" className="w-full" size="lg" isLoading={topUpMutation.isPending}>
        Top Up
      </Button>
    </form>
  );
}
