import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import DatadogInit from '@/components/DatadogInit'; // <--- Import ini

export const metadata: Metadata = {
  title: 'MiniBank - Digital Banking',
  description: 'Modern digital banking platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DatadogInit /> {/* <--- Letakkan di sini (di dalam body) */}
        <QueryProvider>
          <AuthProvider>
            {children}
            <ToastProvider />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}