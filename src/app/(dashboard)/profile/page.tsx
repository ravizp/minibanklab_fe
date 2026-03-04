'use client';

import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useProfileDetail } from '@/features/auth/hooks/useProfile';
import { formatDate } from '@/utils/format';
import { User, Mail, Calendar, Wallet } from 'lucide-react';

export default function ProfilePage() {
  const { data: profile, isLoading, error } = useProfileDetail();

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center py-12">
          <p className="text-red-500">Failed to load profile</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-500 mt-1">Your personal information</p>
      </div>

      <Card>
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {profile.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{profile.name}</h2>
            <p className="text-slate-500">{profile.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <ProfileField icon={<User className="h-5 w-5" />} label="Full Name" value={profile.name} />
          <ProfileField icon={<Mail className="h-5 w-5" />} label="Email Address" value={profile.email} />
          <ProfileField icon={<Calendar className="h-5 w-5" />} label="Member Since" value={formatDate(profile.created_at)} />
          <ProfileField icon={<Wallet className="h-5 w-5" />} label="Total Accounts" value={String(profile.accounts_count ?? 0)} />
        </div>
      </Card>
    </div>
  );
}

function ProfileField({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
      <div className="text-slate-400">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}
