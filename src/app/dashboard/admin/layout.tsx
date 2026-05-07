import { Metadata } from 'next';
import DashboardSidebar from '@/components/DashboardSidebar';

export const metadata: Metadata = {
  title: 'Admin Control Center | AeroReserve',
  description: 'Global control center for fleet and reservation management.',
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar role="admin" />
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
}
