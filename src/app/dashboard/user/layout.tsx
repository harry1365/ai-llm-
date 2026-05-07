import { Metadata } from 'next';
import DashboardSidebar from '@/components/DashboardSidebar';

export const metadata: Metadata = {
  title: 'User Portal | AeroReserve',
  description: 'Manage your personal flight reservations.',
};

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar role="user" />
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
}
