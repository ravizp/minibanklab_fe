'use client';

import Link from 'next/link';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { ArrowUpDown } from 'lucide-react';

export default function RegisterPage() {
  return (
    <>
      <div className="lg:hidden flex items-center gap-2 mb-8">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <ArrowUpDown className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-bold text-slate-900">MiniBank</span>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Create an account</h2>
        <p className="text-slate-500 mt-2">Get started with MiniBank today</p>
      </div>

      <RegisterForm />

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
