'use client';

import { useState, type FormEvent } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useCreateAccount } from '../hooks/useCreateAccount';
import { ACCOUNT_TYPES, CURRENCIES } from '@/utils/constants';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAccountModal({ isOpen, onClose }: CreateAccountModalProps) {
  const [accountType, setAccountType] = useState('savings');
  const [currency, setCurrency] = useState('IDR');
  const createMutation = useCreateAccount();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createMutation.mutate(
      { account_type: accountType, currency },
      {
        onSuccess: () => {
          onClose();
          setAccountType('savings');
          setCurrency('IDR');
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Select
          label="Account Type"
          options={ACCOUNT_TYPES}
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        />
        <Select
          label="Currency"
          options={CURRENCIES}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" isLoading={createMutation.isPending}>
            Create Account
          </Button>
        </div>
      </form>
    </Modal>
  );
}
