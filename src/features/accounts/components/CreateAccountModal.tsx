'use client';

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useCreateAccount } from '../hooks/useCreateAccount';
import { Wallet } from 'lucide-react';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAccountModal({ isOpen, onClose }: CreateAccountModalProps) {
  const createMutation = useCreateAccount();

  const handleCreate = () => {
    createMutation.mutate(undefined, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Account">
      <div className="text-center py-4">
        <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <Wallet className="h-8 w-8 text-blue-600" />
        </div>
        <p className="text-slate-600 mb-6">
          A new bank account will be created with a unique account number and zero balance.
        </p>
        <div className="flex gap-3">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleCreate} isLoading={createMutation.isPending}>
            Create Account
          </Button>
        </div>
      </div>
    </Modal>
  );
}
