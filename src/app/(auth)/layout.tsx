import type { ReactNode } from 'react';
import { ArrowUpDown } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
            <ArrowUpDown className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">MiniBank</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Banking made<br />simple and secure
          </h1>
          <p className="text-blue-200 text-lg max-w-md">
            Manage your accounts, transfer funds, and track your transactions — all in one place.
          </p>
        </div>
        <p className="text-blue-300 text-sm">© 2026 MiniBank. All rights reserved.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
